import type { PostType } from "@/lib/types/post";
import { createClient } from "@/lib/utils/supabase/client";

export const fetchPostDetail = async (postId: string): Promise<PostType | null> => {
  const supabase = await createClient();

  const { data: postDetailData, error } = await supabase
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
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }

  return postDetailData;
};
