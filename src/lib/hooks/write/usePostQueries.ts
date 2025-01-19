import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";

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
      const { data: postData, error: postError } = await supabase.from("posts").select("*").eq("id", id).single();

      console.log("Fetched postData:", postData); // 디버깅 로그 추가

      if (postError) {
        console.error("Post fetch error:", postError);
        throw postError;
      }

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchase")
        .select("*")
        .eq("post_id", id);

      console.log("Fetched purchaseData:", purchaseData); // 디버깅 로그 추가

      if (purchaseError) {
        console.error("Purchase fetch error:", purchaseError);
        throw purchaseError;
      }

      return {
        post: postData,
        purchases: purchaseData || []
      };
    },
    staleTime: 60000, // 1분 동안 캐싱
    onSuccess // 옵션 객체의 일부로 포함
  } as UseQueryOptions<
    {
      post: Database["public"]["Tables"]["posts"]["Row"];
      purchases: Database["public"]["Tables"]["purchase"]["Row"][];
    },
    Error
  >);
};

export const useUpdatePostMutation = (
  id: string,
  formState: {
    content: string;
    address: string;
    body_size: number[];
    images: string[];
    tags: string[];
    purchases: Database["public"]["Tables"]["purchase"]["Insert"][];
  },
  options?: UseMutationOptions<void, Error, void> // 타입 명시
) => {
  // mutationFn 정의
  const mutationFn = async (): Promise<void> => {
    const { content, address, body_size, images, tags, purchases } = formState;

    const updatedPost = {
      content,
      upload_place: address,
      body_size,
      images,
      tags
    };

    // 게시글 업데이트
    const { error: postError } = await supabase.from("posts").update(updatedPost).eq("id", id);

    if (postError) throw postError;

    // 기존 구매 데이터 삭제
    const { error: deleteError } = await supabase.from("purchase").delete().eq("post_id", id);

    if (deleteError) throw deleteError;

    // 새 구매 데이터 삽입
    if (purchases.length > 0) {
      const purchaseData = purchases.map((purchase) => ({
        ...purchase,
        post_id: id
      }));

      const { error: purchaseError } = await supabase.from("purchase").insert(purchaseData);

      if (purchaseError) throw purchaseError;
    }
  };

  return useMutation<void, Error, void>({
    mutationFn, // 분리된 mutationFn 전달
    ...options // 추가 옵션 전달
  });
};
