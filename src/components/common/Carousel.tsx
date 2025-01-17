"use client";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass } from "swiper/react";

type CarouselProps = {
  children: ReactNode;
  slidesPerView?: number; // 보일 슬라이드 개수
  spaceBetween?: number; // 슬라이드 간격
  arrow?: boolean; // 화살표 버튼 여부
  initialSlide?: number; // 초기 슬라이드
  loop?: boolean; // 루프 여부
  autoplay?: { delay: number }; // 자동 재생
  navigation?: boolean; // 네비게이션 화살표(swiper 기본)
  pagination?: boolean; // 페이지네이션
  onSwiper?: (swiper: SwiperClass) => void; // Swiper 인스턴스 콜백
  onSlideChange?: (activeIndex: number) => void; // 슬라이드 변경 콜백
};

const Carousel = ({
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  arrow = false,
  initialSlide = 0,
  loop = false,
  autoplay,
  navigation = false,
  pagination = false,
  onSwiper,
  onSlideChange
}: CarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        initialSlide={initialSlide}
        loop={loop}
        autoplay={autoplay}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : undefined}
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          onSwiper?.(swiperInstance);
        }}
        onSlideChange={(swiperInstance) => {
          onSlideChange?.(swiperInstance.activeIndex);
        }}
        modules={[Navigation, Pagination, ...(autoplay ? [Autoplay] : [])]}
      >
        {children}
      </Swiper>
      {arrow && (
        <>
          <button
            className="slide-arrow prev absolute left-0 top-1/2 -translate-y-1/2 transform"
            onClick={() => swiper?.slidePrev()}
          >
            <CaretLeft />
          </button>
          <button
            className="slide-arrow next absolute right-0 top-1/2 -translate-y-1/2 transform"
            onClick={() => swiper?.slideNext()}
          >
            <CaretRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
