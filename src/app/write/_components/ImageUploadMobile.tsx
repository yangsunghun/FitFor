"use client";

import { Button } from "@/components/ui/Button";
import { Check, Plus, PushPin, Trash } from "@phosphor-icons/react";
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
          <span className="text-lg font-medium text-primary-default">*</span>
        </div>
        <p className="text-body font-medium text-text-03 mb:text-caption">
          다양한 각도에서 찍은 이미지가 있다면 추가해주세요.
          <br />
          추천 사이즈 : OOO x OOO / OOO x OOO
        </p>
      </div>

      {/* 이미지 슬롯 섹션 */}
      <div
        className="overscroll-x-hidden no-scrollbar flex space-x-4 overflow-x-auto pb-4"
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
                    <div className="absolute top-2 right-2 flex gap-1">
                      {/* 썸네일 등록 버튼 */}
                      {index !== 0 && (
                        <Button
                          variant="whiteLine"
                          size="sm"
                          className="p-1 h-5 w-5 !p-0 flex items-center justify-center border-none !text-primary-default rounded-full"
                          onClick={() => {
                            const updatedImages = [url, ...images.filter((img, i) => i !== index)];
                            setImages(updatedImages);
                          }}
                        >
                          <PushPin size={12} weight="fill" />
                        </Button>
                      )}

                      {/* 삭제 버튼 */}
                      <Button
                        variant="whiteLine"
                        size="sm"
                          className="p-1 h-5 w-5 !p-0 flex items-center justify-center border-none rounded-full !text-text-03"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash size={12} />
                      </Button>
                    </div>
                  </>
                )}

                {/* 첫 번째 이미지에 썸네일 표시 */}
                {index === 0 && url && (
                  <div className="text-small absolute bottom-1 left-1 flex items-center gap-1 rounded bg-primary-default h-6 px-1 text-white">
                    <Check size={8} weight="bold" />
                    <span className="font-medium">썸네일</span>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 필수 입력 경고 메시지 */}
      {isMissing && <p className="text-sm text-status-danger">이미지를 업로드해주세요.</p>}
    </div>
  );
};

export default ImageUploadMobile;