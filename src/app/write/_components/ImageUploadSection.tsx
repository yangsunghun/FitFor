import { createClient } from "@/lib/utils/supabase/client";
import { Image as ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 개수

type ImageUploadSectionProps = {
  images: string[]; // 나머지 이미지 배열
  setImages: (images: string[]) => void; // 이미지 배열 업데이트 함수
};

function ImageUploadSection({ images, setImages }: ImageUploadSectionProps) {
  const [imageHashes, setImageHashes] = useState<Set<string>>(new Set()); // 업로드된 이미지 해시 추적

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

    const { publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath).data;

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
      if (imageHashes.has(hash)) {
        alert("이미 업로드된 이미지입니다.");
        return;
      }

      // 새 이미지를 업로드
      const url = await uploadImage(file);
      newImages.push(url);
      newHashes.push(hash);

      // 최대 업로드 제한에 도달하면 작업 중단
      if (existingCount + newImages.length > MAX_IMAGES) {
        alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
        return;
      }
    }

    // 상태 업데이트
    if (newImages.length > 0) {
      setImages([...images, ...newImages]);
      setImageHashes((prev) => new Set([...Array.from(prev), ...newHashes]));
    }
  };

  const handleDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // 해시도 제거
    setImageHashes((prev) => {
      const updatedHashes = Array.from(prev);
      updatedHashes.splice(index, 1);
      return new Set(updatedHashes);
    });
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
    <div className="pt-10 space-y-6">
    <div className="space-y-6">
      {/* 제목 및 설명 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <span className="text-title2 font-bold text-text-04">
            게시물 이미지
          </span>
          <span className="text-title2 font-bold text-primary-default">*</span>
        </div>
        <p className="text-caption text-text-03 font-medium">
          다양한 각도에서 찍은 이미지가 있다면 추가해주세요. (최대 5개)
          <br />
          추천 사이즈 : OOO x OOO / OOO x OOO
        </p>
      </div>
  
      {/* 상단 업로드 섹션 */}
      <div
        className="w-full h-48 bg-bg-02 rounded-lg flex justify-center items-center overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className="w-36 h-36 bg-bg-01 rounded-2xl flex flex-col justify-center items-center cursor-pointer"
          onClick={handleFileInput}
        >
          {/* 아이콘 */}
          <div className="w-6 h-6 text-text-03">
            <ImageIcon size={24} />
          </div>
          {/* 텍스트 */}
          <div className="text-text-03 text-caption font-medium leading-[1.5] mt-1">
            이미지 업로드하기
          </div>
        </div>
      </div>
  
      {/* 하단 이미지 섹션 */}
      <div className="grid grid-cols-4 w-full gap-6">
        {Array(4)
          .fill(null)
          .map((_, index) => {
            const url = images[index]; // 현재 인덱스에 해당하는 이미지 URL
            return (
              <div
                key={index}
                className="relative w-36 h-36 border border-line-02 rounded-lg overflow-hidden flex items-center justify-center"
              >
                {/* 업로드된 이미지 */}
                {url && (
                  <Image
                    src={url}
                    alt={`Uploaded Image ${index + 1}`}
                    layout="fill"
                    className="object-cover"
                  />
                )}
                {/* 삭제 버튼 및 대표 설정 버튼 */}
                {url && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity space-y-2">
                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                    {/* 대표로 설정 버튼 */}
                    {index !== 0 && (
                      <button
                        className="px-2 py-1 bg-gray-200 text-black rounded-lg"
                        onClick={() => {
                          const updatedImages = [
                            url,
                            ...images.filter((img, i) => i !== index),
                          ];
                          setImages(updatedImages);
                        }}
                      >
                        썸네일로 등록
                      </button>
                    )}
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