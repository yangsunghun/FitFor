import { useEffect } from "react";

const useLockScroll = (isOpen?: boolean) => {
  useEffect(() => {
    if (isOpen === false) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // intercepting route modal의 경우, 스크롤 위치 강제 고정
    if (!isOpen) window.scrollTo({ top: 100, left: 0, behavior: "instant" });

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isOpen]);
};

export default useLockScroll;
