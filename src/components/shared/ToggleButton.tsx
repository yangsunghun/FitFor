"use client";

type ToggleButtonProps = {
  isActive: boolean;
  count?: number | null;
  onClick?: () => void;
  activeIcon?: React.ReactNode;
  inactiveIcon: React.ReactNode;
  btnStyle: string;
  text?: boolean;
};

const ToggleButton = ({ isActive, count, onClick, activeIcon, inactiveIcon, btnStyle, text }: ToggleButtonProps) => {
  return (
    <span>
      <button onClick={onClick} className={btnStyle}>
        {isActive ? activeIcon : inactiveIcon}
        <span className="text-text-04">
          {typeof count === "number" && count}
          {text && "북마크"}
        </span>
      </button>
    </span>
  );
};

export default ToggleButton;
