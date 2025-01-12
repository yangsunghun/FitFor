import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 댓글 작성
export const createComment = async (postId: string, content: string) => {
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(`세션 정보를 가져오는 데 실패했습니다: ${sessionError.message}`);
  }

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("로그인이 필요합니다.");
  }

  // 댓글 추가
  const { error: insertError } = await supabase.from("comments").insert({
    post_id: postId,
    content,
    user_id: userId
  });

  if (insertError) {
    throw new Error(`댓글 작성 실패: ${insertError.message}`);
  }

  // 댓글 개수 동기화
  const { error: syncError } = await supabase.rpc("sync_comment_count", { post_id: postId });

  if (syncError) {
    throw new Error(`댓글 개수 동기화 실패: ${syncError.message}`);
  }
};

// 댓글 조회
export const fetchComments = async (postId: string) => {
  const { data: PostComments, error } = await supabase
    .from("comments")
    .select(
      `* , users (
        nickname,    
        profile_image
      )
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("댓글 조회 실패:", error);
    throw new Error(`댓글 조회 실패: ${error.message}`);
  }

  return PostComments;
};

export const deleteComment = async (commentId: string, postId: string) => {
  // 댓글 삭제
  const { error: deleteError } = await supabase.from("comments").delete().eq("id", commentId);

  if (deleteError) {
    throw new Error(`댓글 삭제 실패: ${deleteError.message}`);
  }

  // 댓글 개수 동기화
  const { error: syncError } = await supabase.rpc("sync_comment_count", { post_id: postId });

  if (syncError) {
    throw new Error(`댓글 개수 동기화 실패: ${syncError.message}`);
  }
};
