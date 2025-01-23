"use client";

import Carousel from "@/components/common/Carousel";
import ImageModal from "@/components/shared/ImageModal";
import useModal from "@/lib/hooks/common/useModal";
import Image from "next/image";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  blur: string;
};

const ImageCarousel = ({ images, blur }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <>
      <ImageModal isOpen={isOpen} images={images} selectedImage={selectedImage} onClose={closeModal} />
      <div className="w-[48%] overflow-hidden rounded-2xl tb:w-screen tb:rounded-none">
        <Carousel slidesPerView={1} spaceBetween={0} arrow={false} pagination={true}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="thumbnail relative aspect-square w-full">
              <Image src={image} alt={`이미지 ${index + 1}`} fill={true} placeholder="blur" blurDataURL={blur} />
              <button className="click-box outline-none" onClick={openModal}></button>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
