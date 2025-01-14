"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number;
  onClick?: () => void;
  activeIcon?: React.ReactNode;
  inactiveIcon: React.ReactNode;
  btnStyle: string;
};

const ToggleButton = ({ isActive, count, onClick, activeIcon, inactiveIcon, btnStyle }: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className={btnStyle}>
      <span>{isActive ? activeIcon : inactiveIcon}</span>
      {/* {typeof count === "number" && <span>{count}</span>} */}
    </button>
  );
};

export default ToggleButton;
