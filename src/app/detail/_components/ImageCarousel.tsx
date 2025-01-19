"use client";

import Carousel from "@/components/common/Carousel";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  blur: string;
};

const ImageCarousel = ({ images, blur }: Props) => {
  return (
    <>
      <div className="w-[48%] overflow-hidden rounded-2xl">
        <Carousel slidesPerView={1} spaceBetween={0} arrow={false} pagination={true}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="thumbnail relative aspect-square w-full">
              <Image src={image} alt={`이미지 ${index + 1}`} fill={true} placeholder="blur" blurDataURL={blur} />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
