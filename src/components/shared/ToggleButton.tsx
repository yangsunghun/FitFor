"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  isActive: boolean;
  count?: number | null;
  onClick?: () => void;
  activeIcon?: ReactNode;
  inactiveIcon: ReactNode;
  btnStyle?: string;
  textLabel?: string;
  showNumber?: boolean;
};

const ToggleButton = ({
  isActive,
  count,
  onClick,
  activeIcon,
  inactiveIcon,
  btnStyle = "",
  textLabel,
  showNumber
}: Props) => {
  return (
    <button onClick={onClick} className={clsx("flex items-center gap-1 transition-all", btnStyle)}>
      {isActive ? activeIcon : inactiveIcon}
      {(showNumber || textLabel) && (
        <span className={clsx({ "text-text-03": !isActive, "text-inherit": isActive })}>
          {showNumber && typeof count === "number" && count}
          {textLabel && ` ${textLabel}`}
        </span>
      )}
    </button>
  );
};

export default ToggleButton;
