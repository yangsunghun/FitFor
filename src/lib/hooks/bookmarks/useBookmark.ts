import { fetchBookmarks } from "@/lib/utils/bookmarks/fetchBookmarks";
import { removeBookmark } from "@/lib/utils/detail/bookmarkActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookmarks = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: ownBookmarks,
    isPending,
    isError
  } = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => fetchBookmarks(userId),
    enabled: !!userId,
    staleTime: 5000
  });

  // 북마크 삭제 Mutation
  const { mutateAsync: deleteBookmarks, isPending: isRemoving } = useMutation({
    mutationFn: (postId: string) => removeBookmark(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", userId]
      });
    },
    onError: (error) => {
      console.error("북마크 삭제 중 오류 발생:", error);
    }
  });

  return {
    ownBookmarks,
    isPending,
    isError,
    deleteBookmarks,
    isRemoving
  };
};
