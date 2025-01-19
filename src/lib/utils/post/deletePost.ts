import { createClient } from "../supabase/client";

export const deletePost = async (postId: string): Promise<boolean> => {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Failed to delete post:", error.message);
    return false;
  }

  return true;
};
