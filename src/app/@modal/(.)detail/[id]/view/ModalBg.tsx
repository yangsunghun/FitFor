"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type ModalBgProps = {
  children: React.ReactNode;
};

const ModalBg = ({ children }: ModalBgProps) => {
  const router = useRouter();
  const bodyRef = useRef(document.body);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.overflow = "hidden";
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
      }
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalBg;
