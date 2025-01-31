import { useEffect } from "react";

const useLockScroll = (isOpen?: boolean) => {
  useEffect(() => {
    if (isOpen === false) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isOpen]);
};

export default useLockScroll;
