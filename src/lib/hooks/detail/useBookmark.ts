import { toast } from "@/lib/utils/common/toast";
import { addBookmark, isPostBookmarked, removeBookmark } from "@/lib/utils/detail/bookmarkActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type BookmarkState = {
  isBookmarked: boolean;
};

export const useBookmarks = (postId: string, userId?: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["bookmarks", postId, userId || "guest"];

  // 북마크 상태 가져오기
  const { data: bookmarkData = { isBookmarked: false }, isPending } = useQuery<BookmarkState>({
    queryKey,
    queryFn: async () => {
      if (!userId || userId === "guest") return { isBookmarked: false };
      return { isBookmarked: await isPostBookmarked(postId, userId) };
    },
    enabled: Boolean(postId),
    staleTime: 300000
  });

  //  Mutation (항상 실행되지만, userId 없을 때는 토스트 출력)
  const mutation = useMutation({
    mutationFn: async (isBookmarked: boolean) => {
      if (!userId || userId === "guest") {
        throw new Error("로그인이 필요합니다.");
      }
      return isBookmarked ? removeBookmark(userId, postId) : addBookmark({ user_id: userId, post_id: postId });
    },
    onMutate: async (isBookmarked) => {
      await queryClient.cancelQueries({ queryKey });
      const prevState = queryClient.getQueryData<BookmarkState>(queryKey);

      // 낙관적 업데이트 (항상 실행)
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
    toggleBookmark: () => {
      if (!userId || userId === "guest") {
        return toast("로그인 후 북마크를 추가할 수 있습니다.", "warning");
      }
      mutation.mutate(bookmarkData.isBookmarked);
    }
  };
};
