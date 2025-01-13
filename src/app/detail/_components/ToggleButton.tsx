"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number;
  onClick?: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
};

const ToggleButton = ({ isActive, count, onClick, activeIcon, inactiveIcon }: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className="text-sm flex items-center gap-2">
      <span>{isActive ? activeIcon : inactiveIcon}</span>
      {typeof count === "number" && <span>{count}</span>}
    </button>
  );
};

export default ToggleButton;
