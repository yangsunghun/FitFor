"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { toast } from "@/lib/utils/common/toast";
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
  iconWeight = "fill",
  showText
}: BookmarkButtonProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { isBookmarked, isPending, toggleBookmark } = useBookmarks(postId, userId ?? "");

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-status-info": isBookmarked,
    "w-7 h-7 rounded-lg bg-bg-01 ": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        onClick={() => toast("로그인이 필요합니다", "warning")}
        inactiveIcon={<BookmarkSimple size={iconSize} weight={iconWeight} />}
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
      activeIcon={<BookmarkSimple size={iconSize} weight="fill" />}
      inactiveIcon={<BookmarkSimple size={iconSize} weight={iconWeight} />}
      text={showText || false}
    />
  );
};

export default BookmarkButton;
