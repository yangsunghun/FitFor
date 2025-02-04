"use client";

import Carousel from "@/components/common/Carousel";
import ModalItem from "@/components/ui/Modal";
import { handleImageDownload } from "@/lib/utils/common/ImageDownload";
import { DownloadSimple, X } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { SwiperSlide, type SwiperClass } from "swiper/react";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  selectedImage: string;
  isPagination?: boolean;
};

const ImageModal = ({ images, isOpen, onClose, selectedImage, isPagination = true }: ImageModalProps) => {
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <ModalItem isOpen={isOpen} onClose={onClose} mode="imageView">
      <div className="image-modal">
        <Carousel
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(activeIndex) => {
            setCurrentImage(images[activeIndex]);
          }}
          initialSlide={images.indexOf(selectedImage)}
          pagination={isPagination}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative h-screen w-fit self-center text-center">
              <img src={image} alt={`이미지 ${index + 1}`} className="max-w-screen inline-block max-h-screen" />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>

      {/* 상단 바 */}
      <div className="absolute left-0 top-0 z-20 flex h-16 w-full items-center bg-black/50 px-4">
        <button className="absolute right-4 h-8 w-8 text-white" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* 하단 바 */}
      <div className="absolute bottom-0 left-0 z-20 flex h-16 w-full items-center bg-black/50 px-4">
        <button
          onClick={() => handleImageDownload(currentImage)}
          className="text-sm flex items-center space-x-2 text-white"
        >
          <DownloadSimple className="h-6 w-6" />
        </button>
      </div>
    </ModalItem>
  );
};

export default ImageModal;
