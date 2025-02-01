"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

type ModalBgProps = {
  children: ReactNode;
};

const ModalBg = ({ children }: ModalBgProps) => {
  const router = useRouter();

  useLockScroll();

  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalBg;
