"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple, IconWeight } from "@phosphor-icons/react";

type BookmarkButtonProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail";
  showText?: boolean;
};

const getIconProps = (isActive: boolean, styleType: string, isTabletOrSmaller: boolean) => {
  const size = isTabletOrSmaller ? 16 : styleType === "masonry" ? 20 : 28;
  const weight: IconWeight = isActive || isTabletOrSmaller ? "fill" : "regular";
  return { size, weight };
};

const BookmarkButton = ({ postId, styleType = "masonry", showText }: BookmarkButtonProps) => {
  const buttonClass = cn("flex justify-center items-center ", {
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1 tb:text-text-02": styleType === "list",
    "flex-col gap-2": styleType === "detail"
  });
  const { user } = useAuthStore();
  const userId = user?.id;

  const { isBookmarked, isPending, toggleBookmark } = useBookmarks(postId, userId ?? "");
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        onClick={() => alert("로그인이 필요합니다")}
        inactiveIcon={
          <BookmarkSimple
            className="transition-color text-text-03 duration-300"
            {...getIconProps(false, styleType, isTabletOrSmaller)}
          />
        }
        text={showText || false}
      />
    );
  }

  if (isPending) {
    return null; // 로딩 중 상태
  }

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isBookmarked}
      onClick={toggleBookmark}
      activeIcon={
        <BookmarkSimple
          className="transition-color text-status-info duration-300"
          {...getIconProps(true, styleType, isTabletOrSmaller)}
        />
      }
      inactiveIcon={
        <BookmarkSimple
          className="transition-color text-text-03 duration-300"
          {...getIconProps(false, styleType, isTabletOrSmaller)}
        />
      }
      text={showText || false}
    />
  );
};

export default BookmarkButton;
