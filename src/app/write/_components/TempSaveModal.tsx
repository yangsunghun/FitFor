"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ModalItem from "@/components/ui/Modal";
import { PostWithPurchases } from "@/lib/hooks/write/useFormHanlders";
import type { Database } from "@/lib/types/supabase";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { useEffect, useState } from "react";

type TempSaveModalProps = {
  isOpen: boolean;
  currentUser: Database["public"]["Tables"]["users"]["Row"] | null;
  fetchUnsavedPosts: (userId: string) => Promise<PostWithPurchases[]>;
  onContinue: (post: PostWithPurchases) => void;
  onDiscard: (postId: string) => void;
  onClose: () => void;
  activePostId: string | null; // 현재 작성 중인 Post ID
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

  useEffect(() => {
    const loadUnsavedPosts = async () => {
      if (!currentUser?.id) return; // 사용자 ID가 없으면 종료
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
      loadUnsavedPosts(); // 모달이 열릴 때마다 최신 데이터 가져오기
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
              <div className="mt-2 flex gap-2">
                {post.id === activePostId ? (
                  <span className="rounded bg-gray-400 px-4 py-2 text-white">작성 중...</span>
                ) : (
                  <button
                    onClick={() => {
                      if (post.id === activePostId) {
                        alert("현재 작성 중인 글입니다.");
                        onClose(); // 모달 닫기
                        return;
                      }
                      onContinue(post); // 이어 작성하기 로직 실행
                      onClose(); // 모달 닫기
                    }}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    이어 작성하기
                  </button>
                )}
                <button
                  onClick={async () => {
                    try {
                      // 활성화된 게시글인지 확인
                      if (post.id === activePostId) {
                        alert("현재 작성 중인 글은 삭제할 수 없습니다.");
                        return; // 삭제 중단
                      }

                      // 삭제 핸들러 호출 후 상태에서 제거
                      await onDiscard(post.id);
                      setUnsavedPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
                    } catch (error) {
                      console.error("게시글 삭제 실패:", error);
                    }
                  }}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  삭제하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose} className="mt-4 rounded bg-gray-300 px-4 py-2">
        닫기
      </button>
    </ModalItem>
  );
};

export default TempSaveModal;
