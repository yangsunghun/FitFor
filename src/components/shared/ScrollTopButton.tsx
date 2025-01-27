"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 상태를 확인하여 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // 200px 이상 스크롤 시 버튼 표시
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null; // 버튼이 보이지 않을 때 렌더링 안 함

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary-default text-bg-01 shadow-lg hover:bg-primary-dark focus:outline-none"
      aria-label="최상단으로 이동"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollTopButton;