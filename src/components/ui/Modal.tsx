"use client";

import clsx from "clsx";
import { useEffect, useRef, type MouseEvent } from "react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  mode?: "default" | "imageView";
  className?: string;
};

const ModalItem = ({ isOpen, onClose, children, mode = "default", className }: Props) => {
  // 서버에서 브라우저 객체 undefined 방지
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 클라이언트에서 초기화
    bodyRef.current = document.body;

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
  }, [isOpen]);
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
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative rounded-lg shadow-lg",
          {
            "inline-block h-fit w-auto max-w-lg bg-bg-01 p-6": mode === "default",
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
