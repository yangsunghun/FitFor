"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { useComment } from "@/lib/hooks/detail/useComment";
import Image from "next/image";
import { useState } from "react";

type CommentSectionProps = {
  postId: string;
};

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comment, setComment] = useState("");
  const { comments, isPending, addComment, deleteComment } = useComment(postId);

  if (isPending) {
    return <p>댓글을 불러오는 중...</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-4 font-bold">댓글</h2>
      <div className="mb-4 flex justify-between">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-[calc(100%-90px)] rounded border p-2"
          placeholder="댓글을 작성해주세요."
        />
        {/* 디자인 나오면 컴포넌트 분리 예정 max-length */}

        <button
          onClick={() => {
            addComment(comment);
            setComment("");
          }}
          className="w-[80px] rounded bg-gray-400 py-2 text-white"
          disabled={!comment.trim()}
        >
          작성
        </button>
      </div>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id} className="mb-4 flex items-center gap-5 border-b pb-4">
            <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full">
              <Image src={comment.users.profile_image || sampleImage} alt={comment.users.nickname} fill={true} />
            </div>
            <div className="w-[calc(100%-80px)]">
              <div className="flex w-full justify-between">
                <p>{comment.users.nickname || "알 수 없음"}</p>
                <div className="items-items-center flex gap-4">
                  <p className="text-[14px] text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
                  <button onClick={() => deleteComment(comment.id)} className="text-[14px] text-red-500">
                    삭제
                  </button>
                </div>
              </div>

              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
