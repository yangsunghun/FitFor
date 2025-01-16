"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { Button } from "@/components/ui/Button";
import { useComment } from "@/lib/hooks/detail/useComment";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import Image from "next/image";
import { useState } from "react";

type CommentSectionProps = {
  postId: string;
};

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const [comment, setComment] = useState("");
  const { comments, isPending, addComment, deleteComment } = useComment(postId);

  if (isPending) {
    return <p>스켈레톤 ui 추가해야겠지?</p>;
  }

  const handleDeleteComment = (id: string) => {
    if (confirm("삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      deleteComment(id);
    }
  };

  return (
    <>
      <p className="mb-4 text-title1 font-bold">댓글 {comments.length}개</p>
      <div className="mb-4 flex items-center justify-between">
        <figure className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={(user && user.profile_image) || sampleImage} alt={user ? user.nickname : "비회원"} fill={true} />
        </figure>
        <div className="relative flex w-[calc(100%-4rem)] gap-4 rounded-[1rem] border border-line-02 px-4 py-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="scrollbar-hide w-full max-w-[calc(100%-5rem)] resize-none outline-none"
            placeholder="댓글을 작성해주세요."
          />

          <Button
            onClick={() => {
              {
                userId ? addComment(comment) : alert("로그인이 필요합니다.");
              }
              setComment("");
            }}
            variant="primary"
            className="whitespace-nowrap"
            disabled={!comment.trim()}
          >
            입력
          </Button>
        </div>
      </div>
      <ul className="mt-10">
        {comments?.map((comment) => (
          <li key={comment.id} className="mb-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <figure className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={comment.users.profile_image || sampleImage} alt={comment.users.nickname} fill={true} />
                </figure>
                <p className="text-title1 font-bold">{comment.users.nickname}</p>
              </div>
              <div className="items-items-center flex gap-4">
                <p className="text-text-03">{relativeTimeDay(comment.created_at)}</p>
                {userId === comment.user_id && (
                  <button onClick={() => handleDeleteComment(comment.id)} className="text-[14px] text-red-500">
                    삭제
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2 text-title2 font-medium">{comment.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentSection;
