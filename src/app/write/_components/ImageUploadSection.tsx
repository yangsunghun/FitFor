"use client";

import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import useImageUploadHandlers from "@/lib/hooks/write/useImageUploadHandlers";
import { Dispatch, SetStateAction } from "react";
import ImageUploadDesktop from "./ImageUploadDesktop";
import { ImageUploadMobile } from "./ImageUploadMobile";

export type ImageUploadSectionProps = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  blur: string | null;
  setBlur: (blurUrl: string) => void;
  isMissing?: boolean;
};

const ImageUploadSection = ({ images, setImages, blur, setBlur, isMissing }: ImageUploadSectionProps) => {
  // 핸들러들을 커스텀 훅에서 받아옴
  const { handleFileInput, handleDrop, handleDelete, loadingStatus, blurDataCache } = useImageUploadHandlers({
    images,
    setImages,
    blur,
    setBlur
  });

  // UI 컴포넌트에 전달할 공통 props
  const uiProps = {
    images,
    isMissing,
    handleFileInput,
    handleDrop,
    handleDelete,
    setImages,
    loadingStatus,
    blurDataCache
  };

  return (
    <>
      <Tablet>
        <ImageUploadMobile {...uiProps} />
      </Tablet>

      <MinTablet>
        <ImageUploadDesktop {...uiProps} />
      </MinTablet>
    </>
  );
};

export default ImageUploadSection;
