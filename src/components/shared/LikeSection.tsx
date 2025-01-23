"use client";

import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple, Heart, IconWeight } from "@phosphor-icons/react";
import ToggleButton from "./ToggleButton";

type LikeSectionProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail";
};

// 공통 아이콘 설정 헬퍼 함수
const getIconProps = (isActive: boolean, styleType: string, isTabletOrSmaller: boolean) => {
  const size = isTabletOrSmaller ? 16 : styleType === "masonry" ? 20 : 28;
  const weight: IconWeight = isActive || isTabletOrSmaller ? "fill" : "regular";
  return { size, weight };
};

const LikeSection = ({ postId, styleType = "masonry" }: LikeSectionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { likeCount } = useLikeCount(postId);
  const { isLiked, isPending: likePending, toggleLike } = useLike(postId, userId ?? "");
  const { isBookmarked, isPending: bookmarkPending, toggleBookmark } = useBookmarks(postId, userId ?? "");

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  // 컨테이너 및 버튼 스타일
  const containerClass = cn({
    "flex gap-3 tb:hidden": styleType === "masonry",
    "flex gap-2": styleType === "list",
    "flex gap-10": styleType === "detail"
  });

  const buttonClass = cn("flex justify-center items-center", {
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1 tb:text-text-02": styleType === "list",
    "flex-col gap-2": styleType === "detail"
  });

  // 로그인 상태가 아닌 경우
  if (!userId) {
    return (
      <div className={containerClass}>
        <ToggleButton
          btnStyle={buttonClass}
          isActive={false}
          count={styleType !== "masonry" ? likeCount : null}
          onClick={() => alert("로그인이 필요합니다")}
          inactiveIcon={<Heart {...getIconProps(false, styleType, isTabletOrSmaller)} />}
          text={false}
        />
        {styleType !== "list" && (
          <ToggleButton
            btnStyle={buttonClass}
            isActive={false}
            onClick={() => alert("로그인이 필요합니다")}
            inactiveIcon={<BookmarkSimple {...getIconProps(false, styleType, isTabletOrSmaller)} />}
            text={styleType === "detail"}
          />
        )}
      </div>
    );
  }

  // 로딩 상태 처리
  if (likePending || bookmarkPending) {
    return null;
  }

  // 메인 렌더링
  return (
    <div className={containerClass}>
      <ToggleButton
        btnStyle={buttonClass}
        isActive={isLiked}
        count={styleType !== "masonry" ? likeCount : null}
        onClick={toggleLike}
        activeIcon={<Heart className="text-primary-default" {...getIconProps(true, styleType, isTabletOrSmaller)} />}
        inactiveIcon={<Heart {...getIconProps(false, styleType, isTabletOrSmaller)} />}
        text={false}
      />
      {styleType !== "list" && (
        <ToggleButton
          btnStyle={buttonClass}
          isActive={isBookmarked}
          onClick={toggleBookmark}
          activeIcon={
            <BookmarkSimple className="text-status-info" {...getIconProps(true, styleType, isTabletOrSmaller)} />
          }
          inactiveIcon={<BookmarkSimple {...getIconProps(false, styleType, isTabletOrSmaller)} />}
          text={styleType === "detail"}
        />
      )}
    </div>
  );
};

export default LikeSection;
