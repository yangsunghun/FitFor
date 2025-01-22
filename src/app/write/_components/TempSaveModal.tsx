"use client";

import { useState, useEffect, useRef } from "react";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import ModalItem from "@/components/ui/Modal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { PostWithPurchases } from "@/lib/hooks/write/useFormHanlders";
import type { Database } from "@/lib/types/supabase";

type TempSaveModalProps = {
  isOpen: boolean;
  currentUser: Database["public"]["Tables"]["users"]["Row"] | null;
  fetchUnsavedPosts: (userId: string) => Promise<PostWithPurchases[]>;
  onContinue: (post: PostWithPurchases) => void;
  onDiscard: (postId: string) => void;
  onClose: () => void;
  activePostId: string | null; // 활성화된 Post ID
};

const TempSaveModal = ({
  isOpen,
  currentUser,
  fetchUnsavedPosts,
  onContinue,
  onDiscard,
  onClose,
  activePostId
}: TempSaveModalProps) => {
  const [unsavedPosts, setUnsavedPosts] = useState<PostWithPurchases[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false); // 데이터 가져오기를 한 번만 수행

  useEffect(() => {
    const loadUnsavedPosts = async () => {
      if (!currentUser?.id) return;
      setLoading(true);
  
      try {
        const posts = await fetchUnsavedPosts(currentUser.id); // userId 전달
        setUnsavedPosts(posts);
      } catch (error) {
        console.error("임시 저장 게시물 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (isOpen) {
      loadUnsavedPosts();
    }
  }, [isOpen, currentUser, fetchUnsavedPosts]);

  if (!isOpen) return null;

  return (
    <ModalItem isOpen={isOpen} onClose={onClose}>
      <h2>임시 저장된 게시물</h2>
      {loading ? (
        <LoadingSpinner />
      ) : unsavedPosts.length === 0 ? (
        <p>임시 저장된 게시물이 없습니다.</p>
      ) : (
<ul>
  {unsavedPosts.map((post) => (
    <li key={post.id} className="mb-4">
      <p>{post.content || "본문 없음"}</p>
      <p>{relativeTimeDay(post.created_at)} 작성됨</p>
      <div className="flex gap-2 mt-2">
        {activePostId === post.id ? ( // 활성화된 Post ID와 비교
          <span className="px-4 py-2 bg-gray-400 text-white rounded">작성 중...</span>
        ) : (
          <button
            onClick={() => onContinue(post)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            이어 작성하기
          </button>
        )}
        <button
          onClick={() => onDiscard(post.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          삭제하기
        </button>
      </div>
    </li>
  ))}
</ul>
      )}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded">
        닫기
      </button>
    </ModalItem>
  );
};

export default TempSaveModal;
