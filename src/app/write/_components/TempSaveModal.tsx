"use client";

import { useState, useEffect, useRef } from "react";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import ModalItem from "@/components/ui/Modal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { PostWithPurchases } from "@/lib/hooks/write/useFormHanlders";
import type { Database } from "@/lib/types/supabase";

type TempSaveModalProps = {
  isOpen: boolean;
  currentUser: Database["public"]["Tables"]["users"]["Row"] | null; // null 허용
  fetchUnsavedPosts: () => Promise<PostWithPurchases[]>; 
  onContinue: (post: PostWithPurchases) => void;
  onDiscard: (postId: string) => void;
  onClose: () => void;
};

const TempSaveModal = ({
  isOpen,
  currentUser,
  fetchUnsavedPosts,
  onContinue,
  onDiscard,
  onClose,
}: TempSaveModalProps) => {
  const [unsavedPosts, setUnsavedPosts] = useState<PostWithPurchases[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false); // 데이터 가져오기를 한 번만 수행
  const [activePostId, setActivePostId] = useState<string | null>(null); // 현재 작성 중인 Post ID

  useEffect(() => {
    const loadUnsavedPosts = async () => {
      if (!currentUser || hasFetched.current) return;
      setLoading(true);

      try {
        const posts = await fetchUnsavedPosts(); // 외부에서 전달된 함수 호출
        setUnsavedPosts(posts);
        hasFetched.current = true; 
      } catch (error) {
        console.error("임시 저장된 게시물 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadUnsavedPosts();
    } else {
      hasFetched.current = false; // 모달이 닫히면 플래그 초기화
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
                {activePostId !== post.id && ( // 현재 작성 중인 Post ID와 비교
                  <button
                    onClick={() => {
                      onContinue(post);
                      setActivePostId(post.id); // 현재 작성 중인 ID 설정
                    }}
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
