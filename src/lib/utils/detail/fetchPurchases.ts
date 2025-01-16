import type { Purchase } from "@/lib/types/post";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchPurchases = async (postId: string): Promise<Purchase[]> => {
  const { data: purchases, error } = await supabase.from("purchase").select("*").eq("post_id", postId);

  if (error) {
    throw new Error(`구매처 데이터를 가져오는 중 오류 발생: ${error.message}`);
  }

  return purchases || [];
};
