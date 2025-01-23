"use client";
import { X } from "@phosphor-icons/react";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

type SlideOverProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const SlideOver = ({ title, children, onClose }: SlideOverProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Prevent body scrolling
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;

    if (isVisible && bodyRef.current) {
      bodyRef.current.style.overflow = "hidden";
    } else if (bodyRef.current) {
      bodyRef.current.style.overflow = "";
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
      }
    };
  }, [isVisible]);

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
          "z-[100] w-full rounded-t-2xl bg-white pb-[35px] shadow-lg transition-transform duration-300",
          isVisible ? "animate-slideIn" : "animate-slideOut"
        )}
      >
        <div className="inner flex h-[55px] items-center justify-between">
          <p className="text-body font-medium">{title}</p>
          <button className="text-text-03" onClick={handleClose}>
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default SlideOver;
