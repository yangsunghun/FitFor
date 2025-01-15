import type { PostType } from "@/lib/types/post";
import { fetchPostDetail } from "@/lib/utils/post/fetchPostDetail";
import { useQuery } from "@tanstack/react-query";

export const usePostDetail = (postId: string, initialPost?: PostType) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => fetchPostDetail(postId),
    initialData: initialPost,
    staleTime: 3000,
    enabled: Boolean(postId)
  });

  return {
    post: data,
    isPending,
    isError
  };
};
