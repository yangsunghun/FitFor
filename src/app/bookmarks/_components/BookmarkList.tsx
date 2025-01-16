"use client";

import Cardpost from "@/components/shared/CardPost";
import { useBookmarks } from "@/lib/hooks/bookmarks/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { ownBookmarks, isPending, isError } = useBookmarks(userId || "");

  if (!userId) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (isPending) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다</p>;
  }

  if (!ownBookmarks || ownBookmarks.length === 0) {
    return <p>북마크한 게시물이 없습니다.</p>;
  }

  return (
    <>
      <h2 className="mb-12 text-title1 font-bold text-text-04">
        북마크{" "}
        <span className="text-title2 font-medium">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{ownBookmarks.length}개</span>
      </h2>
      <ul className="square-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ownBookmarks.map((post) => (post ? <Cardpost key={post.id} post={post} isMasonry={false} /> : null))}
      </ul>
    </>
  );
};

export default BookmarkList;
