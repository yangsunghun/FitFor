import { addBookmark, isPostBookmarked, removeBookmark } from "@/lib/utils/detail/toggleState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type BookmarkState = {
  isBookmarked: boolean;
};

export const useBookmarks = (postId: string, userId?: string) => {
  const queryClient = useQueryClient();

  const queryKey = ["bookmarks", postId, userId];

  // 북마크 상태 가져오기
  const { data: bookmarkData = { isBookmarked: false }, isPending } = useQuery<BookmarkState>({
    queryKey,
    queryFn: async () => {
      if (!userId) return { isBookmarked: false };
      return { isBookmarked: await isPostBookmarked(postId, userId) };
    },
    enabled: !!postId && !!userId,
    staleTime: 300000
  });

  // 북마크 토글
  const mutation = useMutation({
    mutationFn: async (isBookmarked: boolean) => {
      if (isBookmarked) {
        await removeBookmark(userId!, postId);
      } else {
        await addBookmark({ user_id: userId!, post_id: postId });
      }
    },
    onMutate: async (isBookmarked) => {
      await queryClient.cancelQueries({ queryKey });

      const prevState = queryClient.getQueryData<BookmarkState>(queryKey);

      queryClient.setQueryData(queryKey, (prevState: BookmarkState | undefined) => ({
        ...(prevState || { isBookmarked: false }),
        isBookmarked: !isBookmarked
      }));

      return { prevState };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    isBookmarked: bookmarkData.isBookmarked,
    isPending,
    toggleBookmark: () => mutation.mutate(bookmarkData.isBookmarked)
  };
};
