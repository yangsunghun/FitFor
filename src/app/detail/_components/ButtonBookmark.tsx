"use client";
import ToggleButton from "@/components/shared/ToggleButton";
import { useBookmarks } from "@/lib/hooks/detail/useBookmark";
import { useToggleAction } from "@/lib/hooks/detail/useToggleAction";
import { cn } from "@/lib/utils/common/className";
import { BookmarkSimple } from "@phosphor-icons/react";

type Props = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showText?: boolean;
};

const useBookmarkAction = (postId: string, userId: string) => {
  const { isBookmarked, isPending, toggleBookmark } = useBookmarks(postId, userId);
  return { isActive: isBookmarked, isPending, toggleAction: toggleBookmark };
};

const BookmarkButton = ({ postId, styleType = "masonry", iconSize, iconWeight = "fill", showText = false }: Props) => {
  const { isActive, isPending, handleClick } = useToggleAction({
    postId,
    actionHook: useBookmarkAction,
    requireLoginMessage: "로그인 후 북마크를 추가할 수 있습니다."
  });

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-status-info": isActive,
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (isPending) return null;

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isActive}
      onClick={handleClick}
      activeIcon={<BookmarkSimple size={iconSize} weight="fill" />}
      inactiveIcon={<BookmarkSimple size={iconSize} weight={iconWeight} />}
      textLabel={showText ? "북마크" : undefined}
    />
  );
};

export default BookmarkButton;
