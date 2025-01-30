"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { toast } from "@/lib/utils/common/toast";
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
  iconWeight = "fill",
  showNumber = false
}: LikeButtonProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { likeCount } = useLikeCount(postId);
  const { isLiked, isPending, toggleLike } = useLike(postId, userId ?? "");
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const responsiveIconSize = isTabletOrSmaller && styleType === "list" ? 16 : iconSize;

  const buttonClass = cn("flex justify-center items-center text-text-02 transition-color duration-300", {
    "text-primary-default": isLiked,
    "w-7 h-7 rounded-lg bg-bg-01 ": styleType === "masonry",
    "gap-1": styleType === "list" || styleType === "detailMob",
    "flex-col gap-2": styleType === "detail"
  });

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        count={styleType !== "masonry" ? likeCount : null}
        onClick={() => toast("로그인이 필요합니다", "warning")}
        inactiveIcon={<Heart size={responsiveIconSize} weight={iconWeight} />}
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
      activeIcon={<Heart size={responsiveIconSize} weight="fill" />}
      inactiveIcon={<Heart size={responsiveIconSize} weight={iconWeight} />}
      text={false}
      showNumber={showNumber}
    />
  );
};

export default LikeButton;
