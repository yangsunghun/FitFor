"use server";

import type { FetchPostsResponse } from "@/lib/types/post";
import type { ProfileEditForm } from "@/lib/types/profile";
import { createClient } from "../supabase/server";

// 유저 정보 업데이트 하는 로직
export const updateUserProfile = async ({
  userId,
  imageFileURL,
  editForm
}: {
  userId: string;
  imageFileURL: string | null;
  editForm: ProfileEditForm;
}) => {
  const supabase = await createClient();

  // db의 유저 데이터 업데이트
  const { error: updateError } = await supabase
    .from("users")
    .update({
      nickname: editForm.nickname,
      introduction: editForm.introduction,
      gender: editForm.gender,
      profile_image: imageFileURL // 새로운 파일 있다면 업로드
    })
    .eq("id", userId);

  if (updateError) {
    throw new Error(`프로필 업데이트 실패: ${updateError.message}`);
  }
};

// 유저의 게시물 데이터 가져오는 로직
export const fetchUserPosts = async ({
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
