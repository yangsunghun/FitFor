"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import clsx from "clsx";
import { type MouseEvent, type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  mode?: "default" | "imageView";
  className?: string;
};

const ModalItem = ({ isOpen, onClose, children, mode = "default", className }: Props) => {
  useLockScroll(isOpen);
  if (!isOpen) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black",
        {
          "bg-opacity-50": mode === "default",
          "image-modal": mode === "imageView"
        },
        isOpen ? "animate-fadeIn" : "animate-fadeOut"
      )}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative rounded-lg shadow-lg",
          {
            "inline-block h-fit w-auto bg-bg-01 p-6": mode === "default",
            "h-full w-full max-w-none bg-transparent": mode === "imageView"
          },
          isOpen ? "animate-fadeIn animate-scaleUp" : "animate-fadeOut animate-scaleDown",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalItem;
