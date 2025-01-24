"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { TextField } from "@/components/ui/TextField";
import { useComment } from "@/lib/hooks/detail/useComment";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CommentSectionProps = {
  postId: string;
};

const CommentMobile = ({ postId }: CommentSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const [comment, setComment] = useState("");
  const { comments, isPending, addComment, deleteComment } = useComment(postId);

  const commentsRef = useRef<HTMLUListElement>(null); // 스크롤 컨테이너 ref

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  };

  // 댓글 배열이 변경될 때 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const handleDeleteComment = (id: string) => {
    if (confirm("삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      deleteComment(id);
    }
  };

  // 로딩 중일 때
  if (isPending) {
    return <p></p>;
  }

  return (
    <div className="inner">
      {/* 댓글 리스트 */}
      <ul ref={commentsRef} className="h-[70vh] overflow-auto">
        {comments
          ?.slice()
          .reverse()
          .map((comment) => (
            <li key={comment.id} className="mb-[24px] flex w-full items-start justify-between">
              <figure className="relative h-[36px] w-[36px] overflow-hidden rounded-full">
                <Image src={comment.users.profile_image || sampleImage} alt={comment.users.nickname} fill={true} />
              </figure>
              <div className="w-[calc(100%-48px)]">
                <div className="flex justify-between">
                  <p className="text-body font-medium">{comment.users.nickname}</p>
                  <div className="flex gap-2">
                    <p className="text-small text-text-03">{relativeTimeDay(comment.created_at)}</p>
                    {userId === comment.user_id && (
                      <button onClick={() => handleDeleteComment(comment.id)} className="text-small text-red-500">
                        삭제
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-body font-medium">{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      {/* 댓글 입력 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (userId) {
            addComment(comment);
            setComment("");
          } else {
            alert("로그인이 필요합니다.");
          }
        }}
        className="relative mb-2"
      >
        <TextField
          variant="default"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={userId ? "메시지를 입력해주세요." : "로그인이 필요합니다"}
          disabled={!userId}
          className="w-full pr-[50px] !outline-none"
        />

        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
          disabled={!comment.trim()}
        >
          <PaperPlaneTilt
            size={24}
            weight="fill"
            className={clsx(comment.trim() ? "text-primary-default" : "text-text-02")}
          />
        </button>
      </form>
    </div>
  );
};

export default CommentMobile;
