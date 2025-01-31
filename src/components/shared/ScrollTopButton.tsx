"use client";

import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { ArrowUp } from "@phosphor-icons/react";
import clsx from "clsx";
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 최상단으로 이동
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className={clsx("z-50 h-fit w-fit transition-all duration-300 ease-in-out", {
        // 단독 사용 시 FloatingButton과 동일한 위치 적용
        "fixed bottom-12 right-[6.875rem] tb:bottom-[80px] tb:right-[24px]": !useFlexLayout,

        // 부모가 flex 레이아웃일 때는 relative 적용
        relative: useFlexLayout
      })}
      style={useFlexLayout ? { bottom: `${12 + extraBottomOffset}px` } : {}}
    >
      <button
        onClick={scrollToTop}
        className={clsx(
          "hover:bg-primary-dark flex items-center justify-center rounded-full bg-primary-default text-bg-01 shadow-lg transition-all duration-300 ease-in-out focus:outline-none",
          {
            // 나타날 때: 위로 올라오며 나타남
            "pointer-events-auto h-[4.5rem] w-[4.5rem] translate-y-0 opacity-100 tb:h-[40px] tb:w-[40px]": isVisible,

            // 사라질 때: 아래로 내려가며 사라짐
            "pointer-events-none translate-y-4 opacity-0": !isVisible,
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
