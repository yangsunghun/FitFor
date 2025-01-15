"use server";

import type { FetchPostsResponse, PostType } from "@/lib/types/post";
import type { ProfileEditForm } from "@/lib/types/profile";
import { createClient } from "../supabase/server";

// 유저의 북마크 정보를 가져오는 로직
export const fetchUserBookmarks = async ({
  userId,
  pageParam = 1
}: {
  userId: string;
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const supabase = await createClient();

  const perPage = 5;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const { data: userBookmarks, error: userBookmarksError } = await supabase
    .from("bookmarks")
    .select("post_id, posts(*, users(nickname, profile_image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (userBookmarksError) {
    console.error("북마크 정보 조회 실패:", userBookmarksError);
    throw new Error(`북마크 정보 조회 실패: ${userBookmarksError.message}`);
  }

  // 가져온 데이터의 형태 정리 (post 데이터만 가져오도록)
  const bookmarks = userBookmarks.map((bookmark: { posts: PostType }) => bookmark.posts);

  return {
    items: bookmarks || [],
    nextPage: bookmarks.length === perPage ? pageParam + 1 : undefined,
    hasMore: bookmarks.length === perPage
  };
};

// 유저의 좋아요 정보를 가져오는 로직
export const fetchUserLikes = async ({
  userId,
  pageParam = 1
}: {
  userId: string;
  pageParam: number;
}): Promise<FetchPostsResponse> => {
  const supabase = await createClient();

  const perPage = 5;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const { data: userLikes, error: userLikesError } = await supabase
    .from("likes")
    .select("post_id, posts(*, users(nickname, profile_image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (userLikesError) {
    console.error("좋아요 정보 조회 실패:", userLikesError);
    throw new Error(`좋아요 정보 조회 실패: ${userLikesError.message}`);
  }

  // 가져온 데이터 형태 정리 (post 데이터만 가져오도록)
  const likes = userLikes.map((like: { posts: PostType }) => like.posts);

  return {
    items: likes || [],
    nextPage: likes.length === perPage ? pageParam + 1 : undefined,
    hasMore: likes.length === perPage
  };
};

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
