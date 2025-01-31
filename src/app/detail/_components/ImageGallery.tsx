"use client";

import sampleImage from "@/assets/images/image_sample.png";
import Carousel from "@/components/common/Carousel";
import ImageModal from "@/components/shared/ImageModal";
import useModal from "@/lib/hooks/common/useModal";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  writerSpec: number[];
  blur: string;
};

const ImageGallery = ({ images, writerSpec, blur }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <>
      <ImageModal isOpen={isOpen} images={images} selectedImage={selectedImage} onClose={closeModal} />
      <div className="w-[48%]">
        <figure className="thumbnail mb-4 aspect-square w-full rounded-2xl">
          <Image
            src={isImgError || !images ? sampleImage : selectedImage}
            alt="Selected"
            fill={true}
            placeholder="blur"
            blurDataURL={blur}
            onError={() => setIsImgError(true)}
          />
          {writerSpec.length === 2 && (
            <p className="absolute bottom-4 left-4 rounded-lg bg-bg-01 bg-opacity-80 px-2 py-1 text-caption font-medium text-text-03">
              {writerSpec[0]}cm · {writerSpec[1]}kg
            </p>
          )}
          <button className="click-box outline-none" onClick={openModal}></button>
        </figure>
        <Carousel slidesPerView={4} spaceBetween={16} arrow={false}>
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative aspect-square overflow-hidden rounded-lg">
              <button className="thumbnail click-box" onClick={() => setSelectedImage(image)}>
                <div
                  className={clsx("click-box z-10 bg-black transition", {
                    "opacity-0": selectedImage === image,
                    "opacity-50": selectedImage !== image
                  })}
                ></div>
                <Image
                  src={isImgError || !image ? sampleImage : image}
                  alt={`이미지 ${index + 1}`}
                  fill={true}
                  onError={() => setIsImgError(true)}
                />
              </button>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageGallery;
