import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import React, { useState } from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 개수

type ImageUploadProps = {
  images: string[]; // 나머지 이미지 배열
  setImages: (images: string[]) => void; // 이미지 배열 업데이트 함수
};

function ImageUpload({ images, setImages }: ImageUploadProps) {
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
    if (images.length >= MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    try {
      const newImages: string[] = [];
      const newHashes: string[] = [];

      for (const file of files) {
        const hash = await genFileHash(file);

        // 기존 해시 확인
        if (imageHashes.has(hash)) {
          alert("이미 업로드된 이미지입니다.");
          continue;
        }

        // 새 이미지를 업로드
        const url = await uploadImage(file);
        newImages.push(url);
        newHashes.push(hash);
      }

      // 상태 업데이트
      setImages([...images, ...newImages]);
      setImageHashes((prev) => new Set([...Array.from(prev), ...newHashes]));
    } catch (error: any) {
      alert(error.message);
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
    <div className="space-y-4">
      {/* 왼쪽 업로드 섹션 */}
      <div
        className="h-48 bg-gray-100 flex flex-col items-center justify-center text-center rounded-lg relative overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-lg font-bold mb-2">
          다양한 각도에서 찍은 이미지를 추가해주세요.
        </p>
        <p className="text-sm text-gray-600 mb-4">
          * 최대 {MAX_IMAGES}장 업로드 가능
          <br />
          * 파일당 최대 5MB
        </p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleFileInput}
        >
          이미지 업로드하기
        </button>
      </div>

      {/* 오른쪽 이미지 섹션 */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-lg overflow-hidden h-36 w-36"
          >
            <Image src={url} alt={`Uploaded Image ${index + 1}`} layout="fill" className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
              >
                X
              </button>
              {index !== 0 && (
                <button
                  className="px-2 py-1 bg-white text-black rounded-lg"
                  onClick={() => {
                    const updatedImages = [
                      url,
                      ...images.filter((img, i) => i !== index),
                    ];
                    setImages(updatedImages);
                  }}
                >
                  대표로 설정
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;