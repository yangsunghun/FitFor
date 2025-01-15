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
    <span className="flex items-center gap-1">
      <button onClick={onClick} className={btnStyle}>
        <span>{isActive ? activeIcon : inactiveIcon}</span>
      </button>
      {typeof count === "number" && <span>{count}</span>}
    </span>
  );
};

export default ToggleButton;
