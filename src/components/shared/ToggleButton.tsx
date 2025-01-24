"use client";

import type { ReactNode } from "react";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number | null;
  onClick?: () => void;
  activeIcon?: ReactNode;
  inactiveIcon: ReactNode;
  btnStyle: string;
  text?: boolean;
  showNumber?: boolean;
};

const ToggleButton = ({
  isActive,
  count,
  onClick,
  activeIcon,
  inactiveIcon,
  btnStyle,
  text,
  showNumber
}: ToggleButtonProps) => {
  return (
    <span>
      <button onClick={onClick} className={btnStyle}>
        {isActive ? activeIcon : inactiveIcon}
        <span className="tb:text-text-03">
          {showNumber && typeof count === "number" && count}
          {text && "북마크"}
        </span>
      </button>
    </span>
  );
};

export default ToggleButton;
