"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number | null;
  onClick?: () => void;
  activeIcon?: React.ReactNode;
  inactiveIcon: React.ReactNode;
  btnStyle: string;
};

const ToggleButton = ({ isActive, count, onClick, activeIcon, inactiveIcon, btnStyle }: ToggleButtonProps) => {
  return (
    <span>
      <button onClick={onClick} className={btnStyle}>
        {isActive ? activeIcon : inactiveIcon}
        {typeof count === "number" && count}
      </button>
    </span>
  );
};

export default ToggleButton;
