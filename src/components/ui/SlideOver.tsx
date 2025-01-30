"use client";
import useLockScroll from "@/lib/hooks/common/useLockScroll";
import { X } from "@phosphor-icons/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";

type SlideOverProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const SlideOver = ({ title, children, onClose }: SlideOverProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useLockScroll(isVisible);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Match the animation duration
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div
        className={clsx(
          "fixed inset-0 z-10 transition-all duration-300",
          isVisible ? "animate-fadeIn bg-black bg-opacity-50" : "animate-fadeOut"
        )}
        onClick={handleClose}
      ></div>

      <div
        className={clsx(
          "relative z-[100] max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white pb-[35px] shadow-lg transition-transform duration-300",
          isVisible ? "animate-slideIn" : "animate-slideOut"
        )}
      >
        <div className="sticky top-0 z-10 w-full bg-white">
          <div className="inner flex h-[75px] items-center justify-between">
            <p className="text-title2 font-medium">{title}</p>
            <button className="text-text-03" onClick={handleClose}>
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default SlideOver;
