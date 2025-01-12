"use client";

import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useLike } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import ToggleButton from "./ToggleButton";

type LikeSectionProps = {
  postId: string;
};

const LikeSection = ({ postId }: LikeSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { isLiked, likeCount, isPending: likePending, toggleLike } = useLike(postId, userId ?? "");
  const { isBookmarked, isPending: bookmarkPending, toggleBookmark } = useBookmarks(postId, userId ?? "");

  if (!userId) {
    return (
      <div className="mt-4 flex gap-4">
        <ToggleButton
          isActive={false}
          count={0}
          activeIcon={<span>좋아요함</span>}
          inactiveIcon={<span>좋아요아직</span>}
          disabled
        />
        <ToggleButton
          isActive={false}
          activeIcon={<span>북마크됨</span>}
          inactiveIcon={<span>북마크아직</span>}
          disabled
        />
      </div>
    );
  }

  if (likePending || bookmarkPending) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mt-4 flex gap-4">
      <ToggleButton
        isActive={isLiked}
        count={likeCount}
        onClick={toggleLike}
        activeIcon={<span>좋아요함</span>}
        inactiveIcon={<span>좋아요아직</span>}
      />
      <ToggleButton
        isActive={isBookmarked}
        onClick={toggleBookmark}
        activeIcon={<span>북마크함</span>}
        inactiveIcon={<span>북마크아직</span>}
      />
    </div>
  );
};

export default LikeSection;
