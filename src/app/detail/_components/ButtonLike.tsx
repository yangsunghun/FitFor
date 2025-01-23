"use client";

import ToggleButton from "@/components/shared/ToggleButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLike, useLikeCount } from "@/lib/hooks/detail/useLike";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils/common/className";
import { Heart, IconWeight } from "@phosphor-icons/react";

type LikeButtonProps = {
  postId: string;
  styleType?: "masonry" | "list" | "detail";
};

const getIconProps = (isActive: boolean, styleType: string, isTabletOrSmaller: boolean) => {
  const size = isTabletOrSmaller ? 16 : styleType === "masonry" ? 20 : 28;
  const weight: IconWeight = isActive || isTabletOrSmaller ? "fill" : "regular";
  return { size, weight };
};

const LikeButton = ({ postId, styleType = "masonry" }: LikeButtonProps) => {
  const buttonClass = cn("flex justify-center items-center ", {
    "w-7 h-7 rounded-lg bg-bg-01": styleType === "masonry",
    "gap-1 tb:text-text-02": styleType === "list",
    "flex-col gap-2": styleType === "detail"
  });

  const { user } = useAuthStore();
  const userId = user?.id;

  const { likeCount } = useLikeCount(postId);
  const { isLiked, isPending, toggleLike } = useLike(postId, userId ?? "");
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  if (!userId) {
    return (
      <ToggleButton
        btnStyle={buttonClass}
        isActive={false}
        count={styleType !== "masonry" ? likeCount : null}
        onClick={() => alert("로그인이 필요합니다")}
        inactiveIcon={
          <Heart
            className="transition-color text-text-03 duration-300"
            {...getIconProps(false, styleType, isTabletOrSmaller)}
          />
        }
        text={false}
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
        <Heart
          className="transition-color text-primary-default duration-300"
          {...getIconProps(true, styleType, isTabletOrSmaller)}
        />
      }
      inactiveIcon={
        <Heart
          className="transition-color text-text-03 duration-300"
          {...getIconProps(false, styleType, isTabletOrSmaller)}
        />
      }
      text={false}
    />
  );
};

export default LikeButton;
