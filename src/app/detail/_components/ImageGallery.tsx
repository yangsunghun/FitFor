"use client";

import Carousel from "@/components/common/Carousel";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  writerSpec: number[];
};

const ImageGallery = ({ images, writerSpec }: Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-[48%]">
      <figure className="thumbnail mb-4 aspect-square w-full rounded-[1rem]">
        <Image src={selectedImage} alt="Selected" fill={true} />
        {writerSpec.length === 2 && (
          <p className="absolute bottom-4 left-4 rounded-[0.5rem] bg-bg-01 bg-opacity-80 px-2 py-1 text-caption font-medium text-text-03">
            {writerSpec[0]}cm · {writerSpec[1]}kg
          </p>
        )}
      </figure>
      <Carousel slidesPerView={4} spaceBetween={16} arrow={false}>
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative aspect-square overflow-hidden rounded-[0.5rem]">
            <button className="thumbnail click-box" onClick={() => setSelectedImage(image)}>
              <div
                className={clsx("click-box z-10 bg-black transition", {
                  "opacity-0": selectedImage === image,
                  "opacity-50": selectedImage !== image
                })}
              ></div>
              <Image src={image} alt={`이미지 ${index + 1}`} fill={true} />
            </button>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGallery;
