"use client";
import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { Heart } from "@phosphor-icons/react";

type Props = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showNumber?: boolean;
};

const LikeButton = ({ postId, styleType = "masonry", iconSize, iconWeight = "fill", showNumber = false }: Props) => {
  const { user } = useAuthStore();
  const userId = user?.id || "guest";

  const { isLiked, isPending, toggleLike } = useLike(postId, userId);
  const { likeCount } = useLikeCount(postId);

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const responsiveIconSize = isTabletOrSmaller && styleType === "list" ? 16 : iconSize;

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-primary-default": isLiked,
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (isPending) return null;

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isLiked}
      count={styleType !== "masonry" ? likeCount : null}
      onClick={toggleLike}
      activeIcon={<Heart size={responsiveIconSize} weight="fill" />}
      inactiveIcon={<Heart size={responsiveIconSize} weight={iconWeight} />}
      showNumber={showNumber}
    />
  );
};

export default LikeButton;
