"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};

const Dropdown = ({ trigger, children, className, onClose }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className={className} ref={dropdownRef}>
      <button onClick={toggleDropdown}>{trigger}</button>

      <div
        className={clsx(
          "shadow-emphasize pointer-events-none absolute right-0 top-full z-20 min-w-[8rem] overflow-hidden rounded-2xl bg-bg-01 px-6 py-4 transition duration-200",
          {
            "pointer-events-auto opacity-100": isOpen,
            "opacity-0": !isOpen
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
