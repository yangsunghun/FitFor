import { addLike, getLikeCount, isPostLiked, removeLike } from "@/lib/utils/detail/likeActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLike = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const likeStatusQueryKey = ["likes", postId, userId];
  const likeCountQueryKey = ["likeCount", postId];

  // 좋아요 상태 가져오기
  const { data: likeData, isPending } = useQuery({
    queryKey: likeStatusQueryKey,
    queryFn: async () => {
      const isLiked = await isPostLiked(postId, userId);
      return { isLiked };
    },
    enabled: Boolean(postId && userId),
    staleTime: 300000
  });

  // 좋아요 상태 토글 Mutation
  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? removeLike(userId, postId) // 좋아요 제거
        : addLike({ user_id: userId, post_id: postId }), // 좋아요 추가
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey: likeStatusQueryKey }); // 기존 쿼리 중단
      await queryClient.cancelQueries({ queryKey: likeCountQueryKey }); // likeCount 쿼리 중단

      // 기존 데이터를 캐싱에서 가져오기
      const prevLikeStatus = queryClient.getQueryData<{ isLiked: boolean }>(likeStatusQueryKey);
      const prevLikeCount = queryClient.getQueryData<number>(likeCountQueryKey);

      // 좋아요 상태 낙관적 업데이트
      queryClient.setQueryData(likeStatusQueryKey, {
        isLiked: !isLiked
      });

      // 좋아요 수 낙관적 업데이트
      queryClient.setQueryData(likeCountQueryKey, (oldLikeCount: number | undefined) => {
        return isLiked ? (oldLikeCount || 0) - 1 : (oldLikeCount || 0) + 1;
      });

      return { prevLikeStatus, prevLikeCount };
    },
    // 에러 발생 시 복구
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(likeStatusQueryKey, context?.prevLikeStatus);
      queryClient.setQueryData(likeCountQueryKey, context?.prevLikeCount);
    },
    // 성공 및 실패 여부와 상관없이 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: likeStatusQueryKey });
      queryClient.invalidateQueries({ queryKey: likeCountQueryKey });
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
