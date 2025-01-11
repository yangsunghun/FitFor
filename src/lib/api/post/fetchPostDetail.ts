import type { PostType } from "@/lib/types/post";
import { createClient } from "../../utils/supabase/client";

export const fetchPostDetail = async (postId: string): Promise<PostType | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (error) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }

  return data;
};
