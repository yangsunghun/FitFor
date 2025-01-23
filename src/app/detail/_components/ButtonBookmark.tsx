"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple } from "@phosphor-icons/react";

type BookmarkButtonProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showText?: boolean;
};

const BookmarkButton = ({
  postId,
  styleType = "masonry",
  iconSize,
  iconWeight = "regular",
  showText
}: BookmarkButtonProps) => {
  const buttonClass = cn("flex justify-center items-center ", {
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1 tb:text-text-02": styleType === "list",
    "flex-col gap-2 text-text-03": styleType === "detail",
    "text-text-02": styleType === "detailMob"
  });
  const { user } = useAuthStore();
  const userId = user?.id;

  const { isBookmarked, isPending, toggleBookmark } = useBookmarks(postId, userId ?? "");

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        onClick={() => alert("로그인이 필요합니다")}
        inactiveIcon={<BookmarkSimple className="transition-color duration-300" size={iconSize} weight={iconWeight} />}
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
        <BookmarkSimple className="transition-color text-status-info duration-300" size={iconSize} weight="fill" />
      }
      inactiveIcon={<BookmarkSimple className="transition-color duration-300" size={iconSize} weight={iconWeight} />}
      text={showText || false}
    />
  );
};

export default BookmarkButton;
