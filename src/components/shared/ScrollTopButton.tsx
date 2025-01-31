"use client";

import { ArrowUp } from "@phosphor-icons/react";
import clsx from "clsx";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useEffect, useState } from "react";

type ScrollTopButtonProps = {
  useFlexLayout?: boolean;
  extraBottomOffset?: number;
};

const ScrollTopButton = ({ useFlexLayout = false, extraBottomOffset = 0 }: ScrollTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)"); // 반응형 여부 확인
  const size = isTabletOrSmaller ? 24 : 48; // 디바이스 크기에 따라 아이콘 크기 설정

  // 스크롤 상태를 확인하여 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200); // 200px 이상 스크롤 시 버튼 표시
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={clsx(
        "h-fit w-fit z-50 transition-all duration-300",
        {
          // 단독 사용 시 FloatingButton과 동일한 위치 적용
          "fixed right-[6.875rem] tb:right-[24px] bottom-12 tb:bottom-[80px]": !useFlexLayout,

          // 부모가 flex 레이아웃일 때는 relative 적용
          "relative": useFlexLayout,
        }
      )}
      style={useFlexLayout ? { bottom: `${12 + extraBottomOffset}px` } : {}}
    >
      <button
        onClick={scrollToTop}
        className={clsx(
          "flex items-center justify-center rounded-full bg-primary-default text-bg-01 shadow-lg hover:bg-primary-dark focus:outline-none transition duration-300",
          {
            "h-[4.5rem] w-[4.5rem] tb:h-[40px] tb:w-[40px] opacity-100 pointer-events-auto": isVisible,
            "opacity-0 pointer-events-none": !isVisible,
          }
        )}
        aria-label="최상단으로 이동"
      >
        <ArrowUp size={size} weight="bold" />
      </button>
    </div>
  );
};

export default ScrollTopButton;