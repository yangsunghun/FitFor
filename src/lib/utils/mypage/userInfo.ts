"use server";

import type { PostType } from "@/lib/types/post";
import { createClient } from "../supabase/server";

export const fetchUserBookmarks = async (userId: string) => {
  if (!userId) return null;

  const supabase = await createClient();

  const { data: userBookmarks, error: userBookmarksError } = await supabase
    .from("bookmarks")
    .select("post_id, posts(*, users(nickname, profile_image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (userBookmarksError) {
    console.error("북마크 정보 조회 실패:", userBookmarksError);
    throw new Error(`북마크 정보 조회 실패: ${userBookmarksError.message}`);
  }

  // 가져온 데이터의 형태 정리 (post 데이터만 가져오도록)
  const bookmarks = userBookmarks.map((bookmark: { posts: PostType }) => bookmark.posts);

  return bookmarks;
};

export const fetchUserLikes = async (userId: string) => {
  if (!userId) return null;

  const supabase = await createClient();

  const { data: userLikes, error: userLikesError } = await supabase
    .from("likes")
    .select("post_id, posts(*, users(nickname, profile_image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (userLikesError) {
    console.error("좋아요 정보 조회 실패:", userLikesError);
    throw new Error(`좋아요 정보 조회 실패: ${userLikesError.message}`);
  }

  // 가져온 데이터 형태 정리 (post 데이터만 가져오도록)
  const likes = userLikes.map((bookmark: { posts: PostType }) => bookmark.posts);
  return likes;
};
