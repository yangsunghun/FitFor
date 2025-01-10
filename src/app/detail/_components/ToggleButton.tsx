"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number;
  onClick?: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  disabled?: boolean;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  count,
  onClick,
  activeIcon,
  inactiveIcon,
  disabled = false
}) => {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-sm" disabled={disabled}>
      <span>{isActive ? activeIcon : inactiveIcon}</span>
      {typeof count === "number" && <span>{count}</span>}
    </button>
  );
};

export default ToggleButton;
