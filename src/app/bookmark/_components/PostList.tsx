"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import Cardpost from "@/components/shared/CardPost";
import CardSkeleton from "@/components/shared/CardSkeleton";
import DeleteConfirm from "@/components/shared/DeleteConfirm";
import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import useModal from "@/lib/hooks/common/useModal";
import { toast } from "@/lib/utils/common/toast";
import { Check } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

type PostListProps = {
  title: string;
  posts: any[]; //
  isPending: boolean;
  isError: boolean;
  onDelete: (postId: string) => Promise<void>;
  invalidateMessage: string;
  kind: string;
};

const PostList = ({ title, posts, isPending, isError, onDelete, invalidateMessage, kind }: PostListProps) => {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]); // 선택된 게시물 상태
  const { isOpen, openModal, closeModal } = useModal();

  if (isError) {
    return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;
  }

  const handleTogglePost = (postId: string) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  const handleRemoveSelectedPosts = async () => {
    try {
      const deleteResults = await Promise.all(
        selectedPosts.map(async (postId) => {
          try {
            await onDelete(postId);
            return true;
          } catch (error) {
            console.error(`삭제 실패: ${postId}`, error);
            return false;
          }
        })
      );

      const isAllDeleted = deleteResults.every((result) => result === true);

      if (isAllDeleted) {
        toast(invalidateMessage, "success");
        setSelectedPosts([]);
      } else {
        toast("삭제하는 중 오류가 발생했습니다.", "warning");
      }
      closeModal();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      closeModal();
      toast("삭제 중 오류가 발생했습니다.", "warning");
    }
  };

  return (
    <>
      <div className="mb-12 mt-8 flex items-center justify-between mb:mb-[24px]">
        <h2 className="text-title1 font-bold text-text-04 mb:text-title2">
          {title}
          <span className="text-title2 font-medium mb:hidden">
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{posts?.length}개
          </span>
        </h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setSelectedPosts([]); // 편집 모드 변경 시 선택 초기화
          }}
          className="text-title2 font-medium underline underline-offset-4 mb:text-caption"
        >
          {isEditing ? "완료" : "편집"}
        </button>
      </div>

      {isEditing && selectedPosts.length > 0 && (
        <div className="mb-4 tb:fixed tb:bottom-0 tb:left-0 tb:z-50 tb:mb-0 tb:w-screen tb:bg-bg-01 tb:py-[12px]">
          <div className="tb:inner flex items-center justify-end gap-3 tb:flex-col tb:gap-2">
            <p className="text-title2 font-medium tb:text-body">{selectedPosts.length}개의 게시물이 선택되었어요</p>
            <Button onClick={openModal} variant="primary" size="sm" className="tb:w-full">
              삭제하기
            </Button>
          </div>
        </div>
      )}

      {!posts || posts.length === 0 ? (
        <p className="mt-32 text-center text-subtitle font-medium text-text-02">아직 {kind}한 게시물이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-6 pb-24 tb:grid-cols-3 tb:gap-4 mb:grid-cols-2 mb:gap-[11px]">
          {isPending
            ? [...Array(8)].map((_, index) => <CardSkeleton key={index} />)
            : posts.map((post) =>
                post ? (
                  <li key={post.id} className="shadow-emphasize relative rounded-2xl p-1">
                    {isEditing && (
                      <i
                        onClick={() => handleTogglePost(post.id)}
                        className={`absolute left-4 top-4 z-30 flex h-7 w-7 items-center justify-center rounded-lg ${
                          selectedPosts.includes(post.id)
                            ? "bg-primary-default text-text-01"
                            : "border border-line-02 bg-bg-01 text-text-02"
                        }`}
                      >
                        <Check size={20} weight="bold" />
                      </i>
                    )}
                    <div className={clsx({ "pointer-events-none": isEditing })}>
                      <Cardpost post={post} />
                    </div>
                  </li>
                ) : null
              )}
        </ul>
      )}

      <ModalItem isOpen={isOpen} onClose={closeModal}>
        <DeleteConfirm closeModal={closeModal} handleDeletePost={handleRemoveSelectedPosts} kind={kind} />
      </ModalItem>
    </>
  );
};

export default PostList;
