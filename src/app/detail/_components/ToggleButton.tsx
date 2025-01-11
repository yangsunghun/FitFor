"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number;
  onClick?: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  disabled?: boolean;
};

const ToggleButton = ({ isActive, count, onClick, activeIcon, inactiveIcon, disabled = false }: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className="text-sm flex items-center gap-2" disabled={disabled}>
      <span>{isActive ? activeIcon : inactiveIcon}</span>
      {typeof count === "number" && <span>{count}</span>}
    </button>
  );
};

export default ToggleButton;
