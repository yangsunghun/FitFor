import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";

type LikesInsert = Database["public"]["Tables"]["likes"]["Insert"];

// 좋아요 추가
export const addLike = async (like: LikesInsert) => {
  const supabase = createClient();

  const { error: likeError } = await supabase.from("likes").insert([like]);
  if (likeError) {
    throw new Error(`Failed to add like: ${likeError.message}`);
  }

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("likes")
    .eq("id", like.post_id)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Failed to fetch post likes: ${fetchError.message}`);
  }

  const updatedLikes = (post?.likes || 0) + 1;
  const { error: updateError } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", like.post_id);

  if (updateError) {
    throw new Error(`Failed to update post likes: ${updateError.message}`);
  }

  return true;
};

// 좋아요 삭제
export const removeLike = async (userId: string, postId: string) => {
  const supabase = createClient();

  const { error: deleteError } = await supabase.from("likes").delete().match({ user_id: userId, post_id: postId });
  if (deleteError) {
    throw new Error(`Failed to remove like: ${deleteError.message}`);
  }

  const { data: post, error: fetchError } = await supabase.from("posts").select("likes").eq("id", postId).maybeSingle();
  if (fetchError) {
    throw new Error(`Failed to fetch post likes: ${fetchError.message}`);
  }

  const updatedLikes = Math.max((post?.likes || 0) - 1, 0);
  const { error: updateError } = await supabase.from("posts").update({ likes: updatedLikes }).eq("id", postId);

  if (updateError) {
    throw new Error(`Failed to update post likes: ${updateError.message}`);
  }

  return true;
};

// 좋아요 개수 조회
export const getLikeCount = async (postId: string) => {
  const supabase = createClient();

  const { data: likesCount, error } = await supabase.from("posts").select("likes").eq("id", postId).maybeSingle();
  if (error) {
    throw new Error(`Failed to fetch like count: ${error.message}`);
  }

  return likesCount?.likes || 0;
};

// 사용자가 좋아요 했는지 확인
export const isPostLiked = async (postId: string, userId: string) => {
  const supabase = createClient();

  const { data: userLike, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to fetch like status: ${error.message}`);
  }

  return !!userLike;
};
