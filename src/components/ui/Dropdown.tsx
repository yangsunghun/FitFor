"use client";

import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { X } from "@phosphor-icons/react";
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

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

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

  // Prevent body scrolling
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isTabletOrSmaller) {
      if (!bodyRef.current) {
        bodyRef.current = document.body;
      }

      if (isOpen && bodyRef.current) {
        bodyRef.current.style.overflow = "hidden";
      } else if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
      }

      return () => {
        if (bodyRef.current) {
          bodyRef.current.style.overflow = "";
        }
      };
    }
  }, [isOpen, isTabletOrSmaller]);

  const mobileUI = (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] h-screen w-screen bg-black opacity-50"
            onClick={() => {
              setIsOpen(false);
              if (onClose) onClose();
            }}
          ></div>

          <div
            className={clsx(
              "fixed bottom-0 left-0 z-[70] w-full rounded-t-2xl bg-white pb-[40px] shadow-lg",
              isOpen ? "animate-slideIn" : "animate-slideOut"
            )}
          >
            <div className="inner flex justify-between py-[24px]">
              <p className="text-title2 font-medium">더보기</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onClose) onClose();
                }}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="inner">{children}</div>
          </div>
        </>
      )}
    </>
  );

  // 데스크톱 UI (기존 드롭다운)
  const desktopUI = (
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
  );

  return (
    <div className={className} ref={dropdownRef}>
      <div onClick={toggleDropdown}>{trigger}</div>
      {isOpen && (isTabletOrSmaller ? mobileUI : desktopUI)}
    </div>
  );
};

export default Dropdown;
