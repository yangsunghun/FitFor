"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import Cardpost from "@/components/shared/CardPost";
import CardSkeleton from "@/components/shared/CardSkeleton";
import { useBookmarks } from "@/lib/hooks/bookmarks/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import { X } from "@phosphor-icons/react";
import { useState } from "react";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { ownBookmarks, isPending, isError, deleteBookmarks } = useBookmarks(userId || "");
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태

  if (!userId) {
    return <p className="mt-32 text-center text-subtitle font-medium text-text-02">로그인이 필요합니다.</p>;
  }

  if (isError) {
    return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;
  }

  const handleRemoveBookmark = (postId: string) => {
    deleteBookmarks(postId);
  };

  return (
    <>
      <div className="mb-12 mt-8 flex items-center justify-between mb:mb-[24px]">
        <h2 className="text-title1 font-bold text-text-04 mb:text-title2">
          북마크
          <span className="text-title2 font-medium mb:hidden">
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{ownBookmarks?.length}개
          </span>
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-title2 font-medium underline underline-offset-4 mb:text-caption"
        >
          {isEditing ? "완료" : "편집"}
        </button>
      </div>
      {!ownBookmarks || ownBookmarks.length === 0 ? (
        <p className="mt-32 text-center text-subtitle font-medium text-text-02">아직 북마크한 게시물이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-6 pb-24 mb:grid-cols-2 mb:gap-[11px] tb:grid-cols-3 tb:gap-4">
          {isPending
            ? [...Array(8)].map((_, index) => <CardSkeleton key={index} />)
            : ownBookmarks.map((post) =>
                post ? (
                  <li key={post.id} className="shadow-emphasize relative rounded-2xl p-1">
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveBookmark(post.id)}
                        className="absolute left-4 top-4 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-bg-01 font-medium"
                      >
                        <X size={16} weight="bold" />
                      </button>
                    )}
                    <Cardpost post={post} />
                  </li>
                ) : null
              )}
        </ul>
      )}
    </>
  );
};

export default BookmarkList;
