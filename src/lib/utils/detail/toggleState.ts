import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";

type LikesInsert = Database["public"]["Tables"]["likes"]["Insert"];
type BookmarksInsert = Database["public"]["Tables"]["bookmarks"]["Insert"];

// 좋아요 추가
export const addLike = async (like: LikesInsert) => {
  const supabase = createClient();

  // likes 테이블 row 추가
  const { error: likeError } = await supabase.from("likes").insert([like]);
  if (likeError) {
    throw new Error(`Failed to add like: ${likeError.message}`);
  }

  // posts 테이블의 likes 값 증가
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("likes")
    .eq("id", like.post_id)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch post likes: ${fetchError.message}`);
  }

  const updatedLikes = (post.likes || 0) + 1;

  const { error: updateError } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", like.post_id);

  if (updateError) {
    throw new Error(`Failed to update post likes: ${updateError.message}`);
  }

  return true;
};

// 좋아요 삭제
export const removeLike = async (userId: string, postId: string) => {
  const supabase = createClient();

  // likes 테이블 row 삭제
  const { error: deleteError } = await supabase.from("likes").delete().match({ user_id: userId, post_id: postId });

  if (deleteError) {
    throw new Error(`Failed to remove like: ${deleteError.message}`);
  }

  // posts 테이블의 likes 값 감소
  const { data: post, error: fetchError } = await supabase.from("posts").select("likes").eq("id", postId).single();

  if (fetchError) {
    throw new Error(`Failed to fetch post likes: ${fetchError.message}`);
  }

  const updatedLikes = Math.max((post.likes || 0) - 1, 0);

  const { error: updateError } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", postId);

  if (updateError) {
    throw new Error(`Failed to update post likes: ${updateError.message}`);
  }

  return true;
};

// 좋아요 개수 조회
export const getLikeCount = async (postId: string) => {
  const supabase = createClient();

  const { data: likesCount, error } = await supabase.from("posts").select("likes").eq("id", postId).single();

  if (error) {
    throw new Error(`Failed to fetch like count: ${error.message}`);
  }

  return likesCount?.likes || 0; // likes 값 반환, 없으면 0
};

// 사용자가 좋아요 했는지 확인
export const isPostLiked = async (postId: string, userId: string) => {
  const supabase = createClient();

  const { data: userLike, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to fetch like status: ${error.message}`);
  }

  return !!userLike;
};

// 북마크 추가
export const addBookmark = async (bookmark: BookmarksInsert) => {
  const supabase = createClient();

  const { data: bookmarkData, error } = await supabase.from("bookmarks").insert([bookmark]);

  if (error) {
    throw new Error(`Failed to add bookmark: ${error.message}`);
  }

  return bookmarkData;
};

// 북마크 삭제
export const removeBookmark = async (userId: string, postId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("bookmarks").delete().match({ user_id: userId, post_id: postId });

  if (error) {
    throw new Error(`Failed to remove bookmark: ${error.message}`);
  }
};

// 사용자가 북마크 했는지 확인
export const isPostBookmarked = async (postId: string, userId: string) => {
  const supabase = createClient();

  const { data: userBookmark, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to fetch bookmark status: ${error.message}`);
  }

  return !!userBookmark;
};
