import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useLockScroll = (isOpen?: boolean) => {
  const pathname = usePathname();

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

  // pathname이 변경되면 스크롤을 다시 활성화
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  }, [pathname]);
};

export default useLockScroll;
