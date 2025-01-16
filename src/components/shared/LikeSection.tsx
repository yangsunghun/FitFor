"use client";

import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useLike } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple, Heart } from "@phosphor-icons/react";
import ToggleButton from "./ToggleButton";

type LikeSectionProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail";
};

const LikeSection = ({ postId, styleType = "masonry" }: LikeSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { isLiked, likeCount, isPending: likePending, toggleLike } = useLike(postId, userId ?? "");
  const { isBookmarked, isPending: bookmarkPending, toggleBookmark } = useBookmarks(postId, userId ?? "");

  const containerClass = cn({
    "flex gap-3": styleType === "masonry",
    "flex gap-2": styleType === "list",
    "flex gap-10": styleType === "detail"
  });

  const buttonClass = cn("flex justify-center items-center ", {
    "w-7 h-7 rounded-[0.5rem] bg-bg-01": styleType === "masonry",
    "gap-1": styleType === "list",
    "flex-col gap-2": styleType === "detail"
  });

  if (!userId) {
    return (
      <div className={containerClass}>
        <ToggleButton
          btnStyle={buttonClass}
          isActive={false}
          count={styleType !== "masonry" ? 0 : null}
          onClick={() => {
            alert("로그인이 필요합니다");
          }}
          inactiveIcon={
            <span className="text-text-03">{styleType === "masonry" ? <Heart size={20} /> : <Heart size={28} />}</span>
          }
          text={false}
        />
        {styleType !== "list" && (
          <ToggleButton
            btnStyle={buttonClass}
            isActive={false}
            onClick={() => {
              alert("로그인이 필요합니다");
            }}
            inactiveIcon={
              <span className="text-text-03">
                {styleType === "masonry" ? <BookmarkSimple size={20} /> : <BookmarkSimple size={28} />}
              </span>
            }
            text={styleType === "detail" ? true : false}
          />
        )}
      </div>
    );
  }

  if (likePending || bookmarkPending) {
    return <p>스켈레톤 ui 추가해야겠지?</p>;
  }

  return (
    <div className={containerClass}>
      <ToggleButton
        btnStyle={buttonClass}
        isActive={isLiked}
        count={styleType !== "masonry" ? likeCount : null}
        onClick={toggleLike}
        activeIcon={
          <span className="text-primary-default">
            {styleType === "masonry" ? <Heart weight="fill" size={20} /> : <Heart weight="fill" size={28} />}
          </span>
        }
        inactiveIcon={
          <span className="text-text-03">{styleType === "masonry" ? <Heart size={20} /> : <Heart size={28} />}</span>
        }
        text={false}
      />
      {styleType !== "list" && (
        <ToggleButton
          btnStyle={buttonClass}
          isActive={isBookmarked}
          onClick={toggleBookmark}
          activeIcon={
            <span className="text-status-info">
              {styleType === "masonry" ? (
                <BookmarkSimple weight="fill" size={20} />
              ) : (
                <BookmarkSimple weight="fill" size={28} />
              )}
            </span>
          }
          inactiveIcon={
            <span className="text-text-03">
              {styleType === "masonry" ? <BookmarkSimple size={20} /> : <BookmarkSimple size={28} />}
            </span>
          }
          text={styleType === "detail" ? true : false}
        />
      )}
    </div>
  );
};

export default LikeSection;
