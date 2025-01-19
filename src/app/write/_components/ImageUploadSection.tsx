"use client";

import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/utils/supabase/client";
import { Check, Image as ImageIcon, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 개수

type ImageUploadSectionProps = {
  images: string[]; // 이미지 배열
  setImages: (images: string[]) => void; // 이미지 배열 업데이트 함수
  blur: string | null;
  setBlur: (blurUrl: string) => void; // Base64 블러 데이터 업데이트 함수
};

function ImageUploadSection({ images, setImages, blur, setBlur }: ImageUploadSectionProps) {
  const [imageHashes, setImageHashes] = useState<string[]>([]); // 업로드된 이미지 해시를 배열로 관리

  // 고유 파일 경로 생성
  const genFilePath = (file: File): string => {
    const timestamp = Date.now(); // 고유 타임스탬프 추가
    const extension = file.name.split(".").pop() || "unknown";
    const folder = "images";
    return `${folder}/${timestamp}.${extension}`;
  };

  // 파일 해시 생성 (SHA-256)
  const genFileHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  // Base64 Blur 데이터 생성
  const generateBlurData = async (file: File): Promise<string | null> => {
    try {
      const imageBitmap = await createImageBitmap(file);

      // Canvas 설정
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context 생성 실패");
        return null;
      }

      // Canvas 크기 설정 (아주 작은 크기로 축소)
      const width = 3; // 축소된 너비
      const height = (imageBitmap.height / imageBitmap.width) * width; // 비율 유지

      canvas.width = width;
      canvas.height = height;

      // 이미지를 Canvas에 그리기
      ctx.drawImage(imageBitmap, 0, 0, width, height);

      // Canvas 데이터를 Base64로 변환
      return canvas.toDataURL("image/jpeg", 0.5); // 품질 50%
    } catch (e) {
      console.error("Blur 처리 실패:", e);
      return null;
    }
  };

  // Supabase에 파일 업로드
  const uploadImage = async (file: File): Promise<string> => {
    validateFile(file);

    // 고유 파일 경로 생성
    const filePath = genFilePath(file);

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }

    const { publicUrl } = supabase.storage.from("post-images").getPublicUrl(filePath).data;

    if (!publicUrl) {
      throw new Error("이미지 URL 생성 실패");
    }

    return publicUrl;
  };

  // 파일 업로드와 중복 제거 로직
  const handleFiles = async (files: File[]) => {
    const existingCount = images.length;

    // 최대 업로드 제한 확인
    if (existingCount >= MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    // 새로 추가된 이미지 관련 변수
    const newImages: string[] = [];
    const newHashes: string[] = [];

    for (const file of files) {
      const hash = await genFileHash(file);

      // 기존 해시 확인
      if (imageHashes.includes(hash)) {
        alert("이미 업로드된 이미지입니다.");
        continue;
      }

      // 새 이미지를 업로드
      const url = await uploadImage(file);
      newImages.push(url);
      newHashes.push(hash);

      if (!blur) {
        const blurData = await generateBlurData(file);

        if (blurData) {
          setBlur(blurData); // Base64 데이터를 부모 상태로 전달
        }
      }

      // 최대 업로드 제한에 도달하면 작업 중단
      if (existingCount + newImages.length > MAX_IMAGES) {
        alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
        return;
      }
    }

    // 상태 업데이트
    if (newImages.length > 0) {
      setImages([...images, ...newImages]);
      setImageHashes([...imageHashes, ...newHashes]);
    }
  };

  const handleDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // 해시도 제거
    setImageHashes((prev) => prev.filter((_, i) => i !== index));
  };

  // 버튼 클릭 시
  const handleFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.onchange = (event: Event) => {
      const files = Array.from((event.target as HTMLInputElement).files || []);
      handleFiles(files);
    };
    fileInput.click();
  };

  // 드래그 앤 드롭 시
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  // 파일 크기 확인
  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
    }
  };

  return (
    <div className="space-y-6 pt-10">
      <div className="space-y-6">
        {/* 제목 및 설명 */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-title2 font-bold text-text-04">게시물 이미지</span>
            <span className="text-title2 font-bold text-primary-default">*</span>
          </div>
          <p className="text-caption font-medium text-text-03">
            다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
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
            {/* 아이콘 */}
            <div className="h-6 w-6 text-text-03">
              <ImageIcon size={24} />
            </div>
            {/* 텍스트 */}
            <div className="mt-1 text-caption font-medium leading-[1.5] text-text-03">이미지 업로드하기</div>
          </div>
        </div>

        {/* 하단 이미지 섹션 */}
        <div className="grid w-full grid-cols-4 gap-6">
          {Array(4)
            .fill(null)
            .map((_, index) => {
              const url = images[index]; // 현재 인덱스에 해당하는 이미지 URL
              return (
                <div
                  key={index}
                  className={`relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg ${
                    index === 0 ? "border-2 border-primary-default" : "border border-line-02"
                  }`}
                >
                  {/* 업로드된 이미지 */}
                  {url && (
                    <Image src={url} alt={`Uploaded Image ${index + 1}`} layout="fill" className="object-cover" />
                  )}
                  {/* 삭제 버튼 및 대표 설정 버튼 */}
                  {url && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => handleDelete(index)}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bg-01 text-text-03"
                      >
                        <Trash size={16} />
                      </button>
                      {/* 썸네일로 설정 버튼 - 임의로 만들어서 체킹받고 또 수정예정..*/}
                      {index !== 0 && (
                        <Button
                          variant="whiteLine"
                          size="sm"
                          className="h-6 w-24 bg-transparent text-caption leading-none !text-text-01"
                          onClick={() => {
                            const updatedImages = [url, ...images.filter((img, i) => i !== index)];
                            setImages(updatedImages);
                          }}
                        >
                          썸네일 등록
                        </Button>
                      )}
                    </div>
                  )}
                  {/* 첫 번째 이미지에 썸네일 표시 */}
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-primary-default px-2 py-1 text-white">
                      <Check size={8} weight="bold" />
                      <span className="text-caption font-medium">썸네일</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ImageUploadSection;
