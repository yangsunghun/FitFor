"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass } from "swiper/react";

type CarouselProps = {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  arrow?: boolean;
};

const Carousel = ({ children, slidesPerView = 5, spaceBetween = 30, arrow }: CarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        onSlideChange={(swiperInstance) => {
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        pagination={{ clickable: true }}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
      {arrow && (
        <>
          <button className="slide-arrow prev" onClick={handlePrev} disabled={isBeginning}>
            <ChevronLeft />
          </button>
          <button className="slide-arrow next" onClick={handleNext} disabled={isEnd}>
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
