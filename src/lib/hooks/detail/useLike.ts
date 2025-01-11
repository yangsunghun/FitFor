import { addLike, getLikeCount, isPostLiked, removeLike } from "@/lib/utils/detail/toggleState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLike = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["likes", postId, userId];

  const { data: likeData, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const isLiked = await isPostLiked(postId, userId);
      const likeCount = await getLikeCount(postId);
      return { isLiked, likeCount };
    },
    enabled: Boolean(postId && userId),
    staleTime: 300000
  });

  const mutation = useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked ? removeLike(userId, postId) : addLike({ user_id: userId, post_id: postId }),
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<{ isLiked: boolean; likeCount: number } | undefined>(queryKey);

      queryClient.setQueryData(queryKey, {
        isLiked: !isLiked,
        likeCount: isLiked ? (prevData?.likeCount || 0) - 1 : (prevData?.likeCount || 0) + 1
      });

      return { prevData };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    isLiked: likeData?.isLiked || false,
    likeCount: likeData?.likeCount || 0,
    isPending,
    toggleLike: () => mutation.mutate(likeData?.isLiked || false)
  };
};
