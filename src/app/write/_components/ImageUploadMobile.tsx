"use client";

import { Button } from "@/components/ui/Button";
import { Check, Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type ImageUploadProps = {
  images: string[];
  isMissing?: boolean;
  handleFileInput: () => void;
  handleDelete: (index: number) => void;
  setImages: Dispatch<SetStateAction<string[]>>;
  loadingStatus: boolean[];
  blurDataCache: (string | null)[];
};

const MAX_IMAGES = 4; // 최대 이미지 개수!!!!!

export const ImageUploadMobile = ({
  images,
  isMissing,
  handleFileInput,
  handleDelete,
  setImages,
  loadingStatus,
  blurDataCache
}: ImageUploadProps) => {
  return (
    <div className="space-y-4 pt-6">
      {/* 제목 및 설명 */}
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="text-title2 font-medium text-text-04 mb:text-body">게시물 이미지</span>
          <span className="text-lg text-title2 font-medium text-primary-default mb:text-body">*</span>
        </div>
        <p className="text-body font-medium text-text-03 mb:text-caption">
          다양한 각도에서 찍은 이미지가 있다면 추가해주세요.
          <br />
          추천 사이즈 : OOO x OOO / OOO x OOO
        </p>
      </div>

      {/* 이미지 슬롯 섹션 */}
      <div
        className="overscroll-x-hidden no-scrollbar flex space-x-4 overflow-x-auto"
        style={{
          scrollbarWidth: "none", // Firefox용 인라인 스타일
          msOverflowStyle: "none" // IE/Edge용 인라인 스타일
        }}
      >
        {Array(MAX_IMAGES)
          .fill(null)
          .map((_, index) => {
            const url = images[index];
            const isUploading = loadingStatus[index];
            const currentBlur = blurDataCache[index];

            return (
              <div
                key={index}
                className={`relative h-[8.65rem] w-[8.65rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-lg mb:h-[7.5rem] mb:w-[7.5rem] ${
                  url ? (index === 0 ? "border-2 border-primary-default" : "border border-line-02") : ""
                }`}
                onClick={!url ? handleFileInput : undefined}
              >
                {/* 빈 슬롯일 경우 */}
                {!url && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-100">
                    <div className="flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-full bg-black-700 p-1.5">
                      <Plus size={18} className="text-text-01" />
                    </div>
                  </div>
                )}

                {/* 블러 이미지 또는 업로드 중 메시지 */}
                {currentBlur && (
                  <Image src={currentBlur} alt="Uploading or Uploaded" layout="fill" className="object-cover" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white">
                    <span>이미지 업로드 중...</span>
                  </div>
                )}
                {/* 업로드된 이미지 */}
                {url && (
                  <>
                    <Image src={url} alt={`Uploaded Image ${index + 1}`} layout="fill" className="object-cover" />

                    {/* 썸네일 등록 버튼 */}
                    {index !== 0 && (
                      <Button
                        variant="disabled"
                        size="sm"
                        className="absolute bottom-2 left-2 flex h-6 items-center gap-1 rounded px-1"
                        onClick={() => {
                          const updatedImages = [url, ...images.filter((img, i) => i !== index)];
                          setImages(updatedImages);
                        }}
                      >
                        <Check size={12} />
                        <span className="text-small font-medium">썸네일</span>
                      </Button>
                    )}

                    {/* 삭제 버튼 */}
                    <Button
                      variant="whiteLine"
                      size="sm"
                      className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-none !p-0 p-1 !text-text-03"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash size={12} />
                    </Button>
                  </>
                )}

                {/* 첫 번째 이미지에 썸네일 표시 */}
                {index === 0 && url && (
                  <div className="absolute bottom-2 left-2 flex h-6 items-center gap-1 rounded bg-primary-default px-1 text-small text-white">
                    <Check size={12} />
                    <span className="font-medium">썸네일</span>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageUploadMobile;
