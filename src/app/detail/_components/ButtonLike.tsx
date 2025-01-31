"use client";
import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useToggleAction } from "@/lib/hooks/detail/useToggleAction";
import { cn } from "@/lib/utils/common/className";
import { Heart } from "@phosphor-icons/react";

type Props = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showNumber?: boolean;
};

const useLikeAction = (postId: string, userId: string) => {
  const { isLiked, isPending, toggleLike } = useLike(postId, userId);
  const { likeCount } = useLikeCount(postId);
  return { isActive: isLiked, isPending, toggleAction: toggleLike, count: likeCount };
};

const LikeButton = ({ postId, styleType = "masonry", iconSize, iconWeight = "fill", showNumber = false }: Props) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const responsiveIconSize = isTabletOrSmaller && styleType === "list" ? 16 : iconSize;

  const { isActive, isPending, count, handleClick } = useToggleAction({
    postId,
    actionHook: useLikeAction,
    requireLoginMessage: "로그인 후 좋아요를 누를 수 있습니다."
  });

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-primary-default": isActive,
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (isPending) return null;

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isActive}
      count={styleType !== "masonry" ? count : null}
      onClick={handleClick}
      activeIcon={<Heart size={responsiveIconSize} weight="fill" />}
      inactiveIcon={<Heart size={responsiveIconSize} weight={iconWeight} />}
      showNumber={showNumber}
    />
  );
};

export default LikeButton;
