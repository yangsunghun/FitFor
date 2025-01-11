import { createComment, deleteComment, fetchComments } from "@/lib/utils/detail/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useComment = (postId: string) => {
  const queryClient = useQueryClient();

  // 댓글 가져오기
  const { data: comments = [], isPending } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    staleTime: 300000 // 캐싱 시간
  });

  // 댓글 추가
  const addCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    }
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    }
  });

  return {
    comments,
    isPending,
    addComment: (content: string) => addCommentMutation.mutate(content),
    deleteComment: (commentId: string) => deleteCommentMutation.mutate(commentId)
  };
};
