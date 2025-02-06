"use client";
import ToggleButton from "@/components/shared/ToggleButton";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple } from "@phosphor-icons/react";

type Props = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showText?: boolean;
};

const BookmarkButton = ({ postId, styleType = "masonry", iconSize, iconWeight = "fill", showText = false }: Props) => {
  const { user } = useAuthStore();
  const userId = user?.id || "guest";

  const { isBookmarked, isPending, toggleBookmark } = useBookmarks(postId, userId);

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-secondary-default": isBookmarked,
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (isPending) return null;

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isBookmarked}
      onClick={toggleBookmark}
      activeIcon={<BookmarkSimple size={iconSize} weight="fill" />}
      inactiveIcon={<BookmarkSimple size={iconSize} weight={iconWeight} />}
      textLabel={showText ? "북마크" : undefined}
    />
  );
};

export default BookmarkButton;
