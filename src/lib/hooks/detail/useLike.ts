import { addLike, getLikeCount, isPostLiked, removeLike } from "@/lib/utils/detail/likeActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLike = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["likes", postId, userId];

  // 좋아요 상태, 총 좋아요 수 가져오기
  const { data: likeData, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const isLiked = await isPostLiked(postId, userId);
      return { isLiked };
    },
    enabled: Boolean(postId && userId),
    staleTime: 300000
  });

  // 상태에 따라 좋아요 토글
  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked ? removeLike(userId, postId) : addLike({ user_id: userId, post_id: postId }),
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<{ isLiked: boolean; likeCount: number } | undefined>(queryKey);

      // 낙관적 업데이트
      queryClient.setQueryData(queryKey, {
        isLiked: !isLiked,
        likeCount: isLiked ? (prevData?.likeCount || 0) - 1 : (prevData?.likeCount || 0) + 1
      });

      return { prevData };
    },
    // 에러 시 이전으로 복구
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    isLiked: likeData?.isLiked || false,
    isPending,
    toggleLike: () => mutation.mutate(likeData?.isLiked || false)
  };
};

export function useLikeCount(postId: string | null) {
  const { data: likeCount = 0, isPending: likeCountPending } = useQuery({
    queryKey: ["likeCount", postId],
    queryFn: async () => {
      return await getLikeCount(postId!);
    },
    enabled: Boolean(postId),
    staleTime: 300000
  });

  return { likeCount, likeCountPending };
}
