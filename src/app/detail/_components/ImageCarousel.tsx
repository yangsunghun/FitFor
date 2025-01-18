"use client";

import Carousel from "@/components/common/Carousel";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
};

const ImageCarousel = ({ images }: Props) => {
  return (
    <>
      <div className="w-[48%] overflow-hidden rounded-2xl">
        <Carousel slidesPerView={1} spaceBetween={0} arrow={false} pagination={true}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="thumbnail relative aspect-square w-full">
              <Image src={image} alt={`이미지 ${index + 1}`} fill={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
