"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { Tablet } from "@/components/common/BreakPoints";
import Carousel from "@/components/common/Carousel";
import ImageModal from "@/components/shared/ImageModal";
import useModal from "@/lib/hooks/common/useModal";
import Image from "next/image";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  writerSpec: number[];
  blur: string;
};

const ImageCarousel = ({ images, writerSpec, blur }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImgError, setIsImgError] = useState<boolean>(false);
  return (
    <>
      <ImageModal isOpen={isOpen} images={images} selectedImage={selectedImage} onClose={closeModal} />
      <div className="relative w-[48%] overflow-hidden rounded-2xl tb:w-screen tb:rounded-none">
        {writerSpec.length === 2 && (
          <p className="absolute right-4 top-4 z-10 rounded-[4px] bg-bg-01 bg-opacity-80 px-2 pb-[3px] pt-[5px] text-small font-medium text-text-03">
            {writerSpec[0]}cm · {writerSpec[1]}kg
          </p>
        )}
        <Carousel slidesPerView={1} spaceBetween={0} arrow={false} pagination={true}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="thumbnail relative aspect-square w-full">
              <Image
                src={isImgError || !images ? sampleImage : image}
                alt={`이미지 ${index + 1}`}
                fill={true}
                sizes="(max-width: 768px) 100vw, 500px"
                placeholder="blur"
                blurDataURL={blur}
                onError={() => setIsImgError(true)}
              />
              <Tablet>
                <button className="click-box outline-none" onClick={openModal}></button>
              </Tablet>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
