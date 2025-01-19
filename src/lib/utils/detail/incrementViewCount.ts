import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const incrementViewCount = async (postId: string) => {
  const { error } = await supabase.rpc("increment_view", { post_id: postId });

  if (error) {
    throw new Error(`조회수 증가 실패: ${error.message}`);
  }
};
