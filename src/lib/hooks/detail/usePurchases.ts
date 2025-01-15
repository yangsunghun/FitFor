import type { Purchase } from "@/lib/types/post";
import { fetchPurchases } from "@/lib/utils/detail/fetchPurchases";
import { useQuery } from "@tanstack/react-query";

export const usePurchases = (postId: string) => {
  const {
    data: purchases,
    isPending,
    isError
  } = useQuery<Purchase[]>({
    queryKey: ["purchases", postId],
    queryFn: () => fetchPurchases(postId),
    staleTime: 5000
  });

  return {
    purchases,
    isPending,
    isError
  };
};
