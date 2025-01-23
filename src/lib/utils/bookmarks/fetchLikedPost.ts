import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchLikedPost = async (userId: string) => {
  // 북마크 데이터 가져오기
  const { data: likes, error } = await supabase
    .from("likes")
    .select("post_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`좋아요 데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`);
  }

  if (likes.length === 0) {
    return [];
  }

  const postIds = likes.map((like) => like.post_id);

  // 게시물 데이터 가져오기
  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select(
      `
      *,
      users (
        nickname,
        profile_image
      )
    `
    )
    .in("id", postIds);

  if (postError) {
    throw new Error(`게시물 데이터를 가져오는 중 오류가 발생했습니다: ${postError.message}`);
  }

  // posts를 좋아요한 순서에 정렬
  const postIdOrder = postIds;
  const orderedPosts = postIdOrder.map((postId) => posts.find((post) => post.id === postId));

  return orderedPosts;
};
