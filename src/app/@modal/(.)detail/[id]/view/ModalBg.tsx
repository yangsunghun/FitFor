"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

type ModalBgProps = {
  children: ReactNode;
};

const ModalBg = ({ children }: ModalBgProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useLockScroll();

  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget && user?.onboard) {
      router.back();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalBg;
