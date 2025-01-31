import { toast } from "@/lib/utils/common/toast";
import { addLike, getLikeCount, isPostLiked, removeLike } from "@/lib/utils/detail/likeActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLike = (postId: string, userId?: string) => {
  const queryClient = useQueryClient();
  const likeStatusQueryKey = ["likes", postId, userId || "guest"];
  const likeCountQueryKey = ["likeCount", postId];

  // 좋아요 상태 가져오기
  const { data: likeData, isPending } = useQuery({
    queryKey: likeStatusQueryKey,
    queryFn: async () => {
      if (!userId || userId === "guest") return { isLiked: false };
      return { isLiked: await isPostLiked(postId, userId) };
    },
    enabled: Boolean(postId),
    staleTime: 300000
  });

  // 좋아요 토글 Mutation (비회원 차단)
  const mutation = useMutation({
    mutationFn: async (isLiked: boolean) => {
      if (!userId || userId === "guest") {
        throw new Error("로그인이 필요합니다.");
      }
      return isLiked ? removeLike(userId, postId) : addLike({ user_id: userId, post_id: postId });
    },
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey: likeStatusQueryKey });
      await queryClient.cancelQueries({ queryKey: likeCountQueryKey });

      const prevLikeStatus = queryClient.getQueryData<{ isLiked: boolean }>(likeStatusQueryKey);
      const prevLikeCount = queryClient.getQueryData<number>(likeCountQueryKey);

      // 낙관적 업데이트
      queryClient.setQueryData(likeStatusQueryKey, { isLiked: !isLiked });
      queryClient.setQueryData(likeCountQueryKey, (oldCount: number | undefined) => {
        return isLiked ? (oldCount || 0) - 1 : (oldCount || 0) + 1;
      });

      return { prevLikeStatus, prevLikeCount };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(likeStatusQueryKey, context?.prevLikeStatus);
      queryClient.setQueryData(likeCountQueryKey, context?.prevLikeCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: likeStatusQueryKey });
      queryClient.invalidateQueries({ queryKey: likeCountQueryKey });
    }
  });

  return {
    isLiked: likeData?.isLiked || false,
    isPending,
    toggleLike: () => {
      if (!userId || userId === "guest") {
        return toast("로그인 후 좋아요를 누를 수 있습니다.", "warning");
      }
      mutation.mutate(likeData?.isLiked || false);
    }
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
