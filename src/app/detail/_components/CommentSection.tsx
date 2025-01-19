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
    return;
  }

  const handleDeleteComment = (id: string) => {
    if (confirm("삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      deleteComment(id);
    }
  };

  return (
    <>
      <p className="mb-4 text-title1 font-bold">댓글 ({comments.length})</p>
      <div className="mb-4 flex items-center justify-between">
        <figure className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={(user && user.profile_image) || sampleImage} alt={user ? user.nickname : "비회원"} fill={true} />
        </figure>
        <div className="relative flex h-16 w-[calc(100%-4rem)] gap-4 overflow-hidden rounded-2xl border border-line-02">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="scrollbar-hide w-full max-w-[calc(100%-5rem)] resize-none px-4 py-4 text-title2 outline-none disabled:bg-bg-01"
            placeholder={userId ? "댓글을 입력해주세요." : "로그인이 필요합니다"}
            disabled={!userId}
          />

          <Button
            onClick={() => {
              {
                userId ? addComment(comment) : alert("로그인이 필요합니다.");
              }
              setComment("");
            }}
            variant={comment.trim() ? "primary" : "disabled"}
            className="absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
            disabled={!comment.trim()}
          >
            입력
          </Button>
        </div>
      </div>
      <ul className="mt-10">
        {comments?.map((comment) => (
          <li key={comment.id} className="mb-4 flex w-full items-start justify-between pb-4">
            <figure className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src={comment.users.profile_image || sampleImage} alt={comment.users.nickname} fill={true} />
            </figure>
            <div className="w-[calc(100%-4.25rem)]">
              <div className="flex justify-between">
                <p className="text-title2 font-bold">{comment.users.nickname}</p>
                <div className="flex gap-4">
                  <p className="text-text-03">{relativeTimeDay(comment.created_at)}</p>
                  {userId === comment.user_id && (
                    <button onClick={() => handleDeleteComment(comment.id)} className="text-[14px] text-red-500">
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-2 text-title2 font-medium">{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentSection;
