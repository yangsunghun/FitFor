"use server";

import type { FetchPostsResponse } from "@/lib/types/post";
import type { ProfileEditForm } from "@/lib/types/profile";
import { createClient } from "@/lib/utils/supabase/server";

// 유저 정보 업데이트 하는 로직
// 온보딩 (닉네임 변경) & 회원정보 수정에 사용됨
export const updateUserProfile = async ({
  userId,
  imageFileURL,
  editForm,
  onboard
}: {
  userId: string;
  imageFileURL: string | null;
  editForm: Partial<ProfileEditForm>;
  onboard?: boolean;
}) => {
  const supabase = await createClient();

  // 닉네임만 필드에 있는 경우 (온보딩)
  // 닉네임, 한줄소개, 성별이 필드에 있는 경우 (회원정보 수정)
  // 두 필드에 대한 값 정리
  const updatePayload: Partial<ProfileEditForm> & { profile_image: string | null; onboard?: boolean } = {
    nickname: editForm.nickname,
    profile_image: imageFileURL,
    onboard
  };

  // 한 줄 소개 (회원 정보 수정)
  if (editForm.introduction) {
    updatePayload.introduction = editForm.introduction;
  }

  // 성별 (회원 정보 수정)
  if (editForm.gender) {
    updatePayload.gender = editForm.gender;
  }

  // db의 유저 데이터 업데이트
  // supabase 업데이트 - 업데이트 하려는 값이 undefined인 경우 해당 column을 업데이트 하지 않음
  const { error: updateError } = await supabase.from("users").update(updatePayload).eq("id", userId);

  if (updateError) {
    throw new Error(`프로필 업데이트 실패: ${updateError.message}`);
  }
};

// 유저의 게시물 데이터 페이지 가져오는 로직 (무한스크롤)
export const fetchUserPostsPerPage = async ({
  userId,
  pageParam
}: {
  userId: string;
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const supabase = await createClient();

  const perPage = 16;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const { data: userPosts, error: userPostsError } = await supabase
    .from("posts")
    .select("*, users(nickname, profile_image)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (userPostsError) {
    throw new Error(`[게시물 불러오기 실패] ${userPostsError.message}`);
  }

  return {
    items: userPosts || [],
    nextPage: userPosts.length === perPage ? pageParam + 1 : undefined,
    hasMore: userPosts.length === perPage
  };
};

// 유저의 모든 좋아요수, 조회수 불러오는 로직
export const fetchUserPostsStats = async (userId: string) => {
  const supabase = await createClient();

  const { data: userPostsStats, error } = await supabase.from("posts").select("view, likes").eq("user_id", userId);

  if (error) throw new Error(`[인증 조건 불러오기 실패] ${error.message}`);

  return userPostsStats;
};

// 유저의 최근 조회 게시물 가져오는 로직
export const fetchRecentViewPosts = async (postIds: string[]) => {
  if (postIds.length === 0) {
    return [];
  }

  const supabase = await createClient();

  const { data: recentPosts, error: recentPostsError } = await supabase
    .from("posts")
    .select("*, users(nickname, profile_image)")
    .in("id", postIds);

  if (recentPostsError) {
    throw new Error(`[최근 조회 포스트 불러오기 실패] ${recentPostsError.message}`);
  }

  // 데이터베이스에 등록된 순으로 post를 가져오기 때문에 최근 본 순으로 정렬 필요
  const idMap = new Map(postIds.map((id, index) => [id, index]));

  return recentPosts.sort((a, b) => (idMap.get(a.id) ?? 0) - (idMap.get(b.id) ?? 0));
};
