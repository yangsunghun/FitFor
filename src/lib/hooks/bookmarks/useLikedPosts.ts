import { fetchLikedPost } from "@/lib/utils/bookmarks/fetchLikedPost";
import { removeLike } from "@/lib/utils/detail/likeActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLikedPosts = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: ownlikedPosts,
    isPending,
    isError
  } = useQuery({
    queryKey: ["likedPosts", userId],
    queryFn: () => fetchLikedPost(userId),
    enabled: !!userId,
    staleTime: 5000
  });

  // 좋아요한 게시물 삭제 Mutation
  const { mutateAsync: deleteLikedPosts, isPending: isRemoving } = useMutation({
    mutationFn: (postId: string) => removeLike(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedPosts", userId]
      });
    },
    onError: (error) => {
      console.error("좋아요한 게시물 삭제 중 오류 발생:", error);
    }
  });

  return {
    ownlikedPosts,
    isPending,
    isError,
    deleteLikedPosts,
    isRemoving
  };
};
