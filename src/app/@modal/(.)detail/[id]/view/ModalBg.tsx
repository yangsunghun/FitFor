"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ModalBgProps = {
  children: React.ReactNode;
};

const ModalBg: React.FC<ModalBgProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
