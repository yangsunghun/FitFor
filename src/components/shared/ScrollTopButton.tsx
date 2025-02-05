import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { ArrowUp } from "@phosphor-icons/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

type ScrollTopButtonProps = {
  useFlexLayout?: boolean;
  extraBottomOffset?: number;
  isFloatingOpen?: boolean;
};

const ScrollTopButton = ({
  useFlexLayout = false,
  extraBottomOffset = 0,
  isFloatingOpen = false
}: ScrollTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)"); // 반응형 여부 확인
  const size = isTabletOrSmaller ? 24 : 40; // 디바이스 크기에 따라 아이콘 크기 설정
  const [animateIn, setAnimateIn] = useState(false); // 애니메이션 효과를 위한 상태 (초기에는 true로 설정)
  // isFloatingOpen이 true면 렌더링하지 않음
  if (isFloatingOpen) return null;

  // 스크롤 상태를 확인하여 버튼 표시 여부 결정
  const handleScroll = useCallback(() => {
    if (window.scrollY > 200) {
      // 200px 이상 스크롤 시 버튼 표시
      if (!isVisible) {
        setIsVisible(true);
        setAnimateIn(true);
        setTimeout(() => {
          setAnimateIn(false);
        }, 50);
      }
    } else {
      setIsVisible(false);
      setAnimateIn(false);
    }
  }, [isVisible]);

  // 컴포넌트 마운트될 때 스크롤 상태 바로 확인
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 최상단으로 이동
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // 나타날 때랑 사라질때의 속성 분리..
  const buttonInlineStyle = isVisible
    ? {
        opacity: 1, // 나타날 때
        transform: animateIn ? "translateY(3rem)" : "translateY(0)",
        transition: "transform 0.4s ease-out, opacity 0.3s ease"
      }
    : {
        opacity: 0, // 사라질 때
        transform: "translateY(0)",
        transition: "opacity 0.3s ease"
      };

  return (
    <div
      className={clsx("z-40 h-fit w-fit", {
        // 단독 사용 시 FloatingButton과 동일한 위치 적용
        "fixed bottom-12 right-[6.875rem] tb:bottom-[80px] tb:right-[24px]": !useFlexLayout,

        // 부모가 flex 레이아웃일 때는 relative 적용
        relative: useFlexLayout
      })}
      style={useFlexLayout ? { bottom: `${12 + extraBottomOffset}px` } : {}}
    >
      <button
        onClick={scrollToTop}
        style={buttonInlineStyle}
        className={clsx(
          "shadow-strong flex items-center justify-center rounded-full bg-secondary-default text-bg-01 focus:outline-none",
          { "hover:bg-secondary-light": !isTabletOrSmaller },
          "h-[4rem] w-[4rem] tb:h-[2.5rem] tb:w-[2.5rem]"
        )}
        aria-label="최상단으로 이동"
      >
        <ArrowUp size={size} weight="bold" />
      </button>
    </div>
  );
};

export default ScrollTopButton;
