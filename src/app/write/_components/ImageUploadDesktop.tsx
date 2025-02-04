"use client";

import { Button } from "@/components/ui/Button";
import { Check, Image as ImageIcon, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { Dispatch, DragEvent, SetStateAction } from "react";

type ImageUploadProps = {
  images: string[];
  isMissing?: boolean;
  handleFileInput: () => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleDelete: (index: number) => void;
  setImages: Dispatch<SetStateAction<string[]>>;
  loadingStatus: boolean[]; // 추가
  blurDataCache: (string | null)[]; // 추가
};

const MAX_IMAGES = 4; // 최대 이미지 개수

const ImageUploadDesktop = ({
  images,
  isMissing,
  handleFileInput,
  handleDrop,
  handleDelete,
  setImages,
  loadingStatus,
  blurDataCache
}: ImageUploadProps) => {
  return (
    <div className="space-y-6 pt-10">
      {/* 제목 및 설명 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <span className="text-title2 font-bold text-text-04">게시물 이미지</span>
          <span className="text-title2 font-bold text-primary-default">*</span>
        </div>
        <p className="text-caption font-medium text-text-03">
          다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 {MAX_IMAGES}개)
          <br />
          추천 사이즈 : OOO x OOO / OOO x OOO
        </p>
      </div>

      {/* 상단 업로드 섹션 */}
      <div
        className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-bg-02"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className="flex h-36 w-36 cursor-pointer flex-col items-center justify-center rounded-2xl bg-bg-01"
          onClick={handleFileInput}
        >
          <div className="h-6 w-6 text-text-03">
            <ImageIcon size={24} />
          </div>
          <div className="mt-1 text-caption font-medium leading-[1.5] text-text-03">이미지 업로드하기</div>
        </div>
      </div>

      {/* 하단 이미지 섹션 */}
      <div className="grid w-full grid-cols-4 gap-6">
        {Array(MAX_IMAGES)
          .fill(null)
          .map((_, index) => {
            const url = images[index];
            const isUploading = loadingStatus[index];
            const currentBlur = blurDataCache[index]; // 각 이미지의 블러 데이터를 가져옴

            return (
              <div
                key={index}
                className={`relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg ${
                  index === 0 && url ? "border-2 border-primary-default" : "border border-line-02"
                }`}
              >
                {/* 블러 이미지 or 업로드 중 메시지 */}
                {currentBlur && (
                  <Image src={currentBlur} alt="Uploading or Uploaded" layout="fill" className="object-cover" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white">
                    <span>이미지 업로드 중...</span>
                  </div>
                )}

                {/* 업로드 완료된 이미지 */}
                {url && !isUploading && (
                  <>
                    <Image src={url} alt={`Uploaded Image ${index + 1}`} layout="fill" className="object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => handleDelete(index)}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
                      >
                        <Trash size={16} />
                      </button>
                      {/* 썸네일 등록 버튼 */}
                      {index !== 0 && (
                        <Button
                          variant="whiteLine"
                          size="sm"
                          className="h-6 w-24 border-none bg-transparent text-caption leading-none !text-text-01"
                          onClick={() => {
                            const updatedImages = [url, ...images.filter((img, i) => i !== index)];
                            setImages(updatedImages);
                          }}
                        >
                          썸네일 등록
                        </Button>
                      )}
                    </div>
                  </>
                )}

                {/* 첫 번째 이미지에 썸네일 표시 */}
                {index === 0 && url && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-primary-default px-2 py-1 text-white">
                    <Check size={8} weight="bold" />
                    <span className="text-caption font-medium">썸네일</span>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 필수 입력 경고 메시지 */}
      {isMissing && <p className="text-body text-status-danger">이미지를 업로드해주세요.</p>}
    </div>
  );
};

export default ImageUploadDesktop;
