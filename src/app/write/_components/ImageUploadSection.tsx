"use client";


import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { ImageUploadMobile } from "./ImageUploadMobile";

import { Dispatch, SetStateAction } from "react";
import useImageUploadHandlers from "@/lib/hooks/write/useImageUploadHandlers";
import ImageUploadDesktop from "./ImageUploadDesktop";

export type ImageUploadSectionProps = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  blur: string | null;
  setBlur: (blurUrl: string) => void;
  isMissing?: boolean;
};

const ImageUploadSection = ({ images, setImages, blur, setBlur, isMissing }: ImageUploadSectionProps) => {
  // 768px 이하일 경우 모바일로 간주
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)"); 

  // 핸들러들을 커스텀 훅에서 받아옴
  const { handleFileInput, handleDrop, handleDelete, loadingStatus, blurDataCache } = useImageUploadHandlers({ images, setImages, blur, setBlur });

  // UI 컴포넌트에 전달할 공통 props
  const uiProps = { images, isMissing, handleFileInput, handleDrop, handleDelete, setImages, loadingStatus, blurDataCache };

  return isTabletOrSmaller ? <ImageUploadMobile {...uiProps} /> : <ImageUploadDesktop {...uiProps} />;
};

export default ImageUploadSection;