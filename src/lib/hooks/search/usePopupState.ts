"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const usePopupState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLElement | null>(null);

  // URL의 `popup` 파라미터를 감지하여 상태 업데이트
  useEffect(() => {
    const popup = searchParams.get("popup");
    setIsOpen(popup === "true");
  }, [searchParams]);

  // 스크롤 비활성화/활성화 로직
  useEffect(() => {
    if (!bodyRef.current) {
      bodyRef.current = document.body;
    }

    if (isOpen) {
      bodyRef.current.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      bodyRef.current.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    router.replace("/search");
  };

  return { isOpen, closePopup };
};

export default usePopupState;
