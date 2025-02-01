"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type MouseEvent, type ReactNode } from "react";

type ModalBgProps = {
  children: ReactNode;
};

const ModalBg = ({ children }: ModalBgProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useLockScroll(true);

  // pathname이 변경되면 스크롤을 다시 활성화
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [pathname]);

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
