"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import { PostWithPurchases } from "@/lib/hooks/write/useFormStateHandlers";
import type { Database } from "@/lib/types/supabase";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type TempSaveModalProps = {
  isOpen: boolean;
  currentUser: Database["public"]["Tables"]["users"]["Row"] | null;
  fetchUnsavedPosts: (userId: string) => Promise<PostWithPurchases[]>;
  onContinue: (post: PostWithPurchases) => void;
  onDiscard: (postId: string) => void;
  onClose: () => void;
  onTemporarySave: () => void; // 임시 저장 로직
  activePostId: string | null; // 현재 작성 중인 Post ID
};

const TempSaveModal = ({
  isOpen,
  currentUser,
  fetchUnsavedPosts,
  onContinue,
  onDiscard,
  onClose,
  onTemporarySave,
  activePostId
}: TempSaveModalProps) => {
  const [state, setState] = useState({
    unsavedPosts: [] as PostWithPurchases[],
    loading: false
  });

  useEffect(() => {
    const loadUnsavedPosts = async () => {
      if (!currentUser?.id) return;
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const posts = await fetchUnsavedPosts(currentUser.id);
        setState({ unsavedPosts: posts, loading: false });
      } catch (error) {
        console.error("임시 저장 게시물 가져오기 실패:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    if (isOpen) {
      loadUnsavedPosts();
    }
  }, [isOpen, currentUser, fetchUnsavedPosts]);
  
    // 모달 닫기 핸들러
    const handleClose = () => {
      window.scrollTo(0, 0); // 즉시 최상단으로 이동
      onClose(); // 기존 onClose 호출
    };

  if (!isOpen) return null;

  return (
    <ModalItem isOpen={isOpen} onClose={onClose}>
      <h2 className="text-title2 font-bold text-text-04">임시 저장</h2>
      <hr className="my-4 w-[30vw] max-w-full" />
      {state.loading ? (
        <LoadingSpinner />
      ) : state.unsavedPosts.length === 0 ? (
        <p>임시 저장된 게시물이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {state.unsavedPosts.map((post) => (
            <li key={post.id} className="group flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 날짜 */}
                <p className="text-caption text-text-03">{relativeTimeDay(post.created_at)}</p>
                {/* 본문 내용 */}
                <p
                  className="cursor-pointer text-body text-text-04 hover:text-text-03 hover:underline"
                  onClick={() => {
                    if (post.id === activePostId) {
                      alert("현재 작성 중인 글입니다.");
                      handleClose(); // 최상단 이동 후 모달 닫기
                      return;
                    }
                    onContinue(post); // 이어 작성하기 로직
                    handleClose(); // 최상단 이동 후 모달 닫기
                  }}
                >
                  {post.content || "제목 없음"}
                </p>
              </div>
              {/* 삭제 아이콘 */}
              <button
                onClick={async () => {
                  try {
                    if (post.id === activePostId) {
                      alert("현재 작성 중인 글은 삭제할 수 없습니다.");
                      return;
                    }
                    await onDiscard(post.id); // 삭제 핸들러 호출
                    setState((prev) => ({ ...prev, unsavedPosts: prev.unsavedPosts.filter((p) => p.id !== post.id) }));
                  } catch (error) {
                    console.error("게시글 삭제 실패:", error);
                  }
                }}
                className="text-text-02 hover:text-text-04"
              >
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-center gap-4 pt-10">
        <Button variant="grayLine" size="md" className="text-caption" onClick={handleClose}>
          취소
        </Button>
        <Button variant="secondary" size="md" className="text-caption" onClick={onTemporarySave}>
          임시 저장하기
        </Button>
      </div>
    </ModalItem>
  );
};

export default TempSaveModal;
