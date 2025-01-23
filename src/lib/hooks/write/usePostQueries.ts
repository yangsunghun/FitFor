import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const supabase = createClient();

export const useEditPostQuery = (
  id: string,
  onSuccess?: (data: {
    post: Database["public"]["Tables"]["posts"]["Row"];
    purchases: Database["public"]["Tables"]["purchase"]["Row"][];
  }) => void
) => {
  return useQuery<
    {
      post: Database["public"]["Tables"]["posts"]["Row"];
      purchases: Database["public"]["Tables"]["purchase"]["Row"][];
    },
    Error
  >({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data: postData, error: postError } = await supabase.from("posts").select("*").eq("is_saved", false).eq("id", id).single();

      if (postError) {
        console.error("Post fetch error:", postError);
        throw postError;
      }

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchase")
        .select("*")
        .eq("post_id", id);

      if (purchaseError) {
        console.error("Purchase fetch error:", purchaseError);
        throw purchaseError;
      }

      return {
        post: postData,
        purchases: purchaseData || []
      };
    },
    staleTime: 60000,
    onSuccess
  } as UseQueryOptions<
    {
      post: Database["public"]["Tables"]["posts"]["Row"];
      purchases: Database["public"]["Tables"]["purchase"]["Row"][];
    },
    Error
  >);
};
