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
    return <p>로그인이 필요합니다.</p>;
  }

  if (isError) {
    return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;
  }

  if (!ownBookmarks || ownBookmarks.length === 0) {
    return <p>북마크한 게시물이 없습니다.</p>;
  }

  const handleRemoveBookmark = (postId: string) => {
    deleteBookmarks(postId);
  };

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-title1 font-bold text-text-04">
          북마크
          <span className="text-title2 font-medium">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{ownBookmarks.length}개</span>
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-title2 font-medium underline underline-offset-4"
        >
          {isEditing ? "완료" : "편집"}
        </button>
      </div>
      <ul className="square-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isPending
          ? [...Array(8)].map((_, index) => <CardSkeleton key={index} />)
          : ownBookmarks.map((post) =>
              post ? (
                <li key={post.id} className="searchbar-shadow relative rounded-2xl p-1">
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
        {/* {} */}
      </ul>
    </>
  );
};

export default BookmarkList;
