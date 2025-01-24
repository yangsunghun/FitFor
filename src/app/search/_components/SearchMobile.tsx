"use client";

import HeaderCategorys from "@/components/layout/HeaderCategorys";
import SearchBar from "@/components/layout/SearchBar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchMobile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLElement | null>(null);

  // URL의 `popup` 파라미터를 감지하여 상태 업데이트
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const popup = params.get("popup");
    setIsOpen(popup === "true");
  }, []);

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

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 h-screen w-screen bg-bg-01">
          <SearchBar />
          <HeaderCategorys />
        </div>
      )}
    </>
  );
};

export default SearchMobile;
