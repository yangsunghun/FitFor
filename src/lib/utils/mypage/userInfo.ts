"use server";

import type { FetchPostsResponse, PostType } from "@/lib/types/post";
import { createClient } from "../supabase/server";

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
  const likes = userLikes.map((bookmark: { posts: PostType }) => bookmark.posts);

  return {
    items: likes || [],
    nextPage: likes.length === perPage ? pageParam + 1 : undefined,
    hasMore: likes.length === perPage
  };
};
