"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { Heart } from "@phosphor-icons/react";

type LikeButtonProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail" | "detailMob";
  iconSize: number;
  iconWeight?: "fill" | "regular";
  showNumber?: boolean;
};

const LikeButton = ({
  postId,
  styleType = "masonry",
  iconSize,
  iconWeight = "regular",
  showNumber = false
}: LikeButtonProps) => {
  const buttonClass = cn("flex justify-center items-center ", {
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1 tb:text-text-02": styleType === "list",
    "flex-col gap-2 text-text-03": styleType === "detail",
    "gap-1 text-text-02": styleType === "detailMob"
  });

  const { user } = useAuthStore();
  const userId = user?.id;

  const { likeCount } = useLikeCount(postId);
  const { isLiked, isPending, toggleLike } = useLike(postId, userId ?? "");
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const responsiveIconSize = isTabletOrSmaller && styleType === "list" ? 16 : iconSize;

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        count={styleType !== "masonry" ? likeCount : null}
        onClick={() => alert("로그인이 필요합니다")}
        inactiveIcon={<Heart className="transition-color duration-300" size={responsiveIconSize} weight={iconWeight} />}
        text={false}
        showNumber={showNumber}
      />
    );
  }

  if (isPending) {
    return null;
  }

  return (
    <ToggleButton
      btnStyle={buttonClass}
      isActive={isLiked}
      count={styleType !== "masonry" ? likeCount : null}
      onClick={toggleLike}
      activeIcon={
        <Heart className="transition-color text-primary-default duration-300" size={responsiveIconSize} weight="fill" />
      }
      inactiveIcon={<Heart className="transition-color duration-300" size={responsiveIconSize} weight={iconWeight} />}
      text={false}
      showNumber={showNumber}
    />
  );
};

export default LikeButton;
