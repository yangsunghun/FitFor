import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import React from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 개수

type ImageUploadProps = {
  images: string[]; // 나머지 이미지 배열
  setImages: (images: string[]) => void; // 이미지 배열 업데이트 함수
};

function ImageUpload({ images, setImages }: ImageUploadProps) {

  // 고유 파일 경로 생성
  const generateFilePath = (file: File): string => {
    const timestamp = Date.now(); // 고유 타임스탬프 추가
    const extension = file.name.split(".").pop() || "unknown";
    const folder = "images";
    return `${folder}/${timestamp}.${extension}`;
  };

  // Supabase 스토리지에 파일 업로드
  const uploadToSupabase = async (file: File, filePath: string) => {
    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }
  };

  // 업로드된 파일의 공개 URL 가져오기
  const getPublicUrl = (filePath: string): string => {
    const { publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath).data;

    if (!publicUrl) {
      throw new Error("이미지 URL 생성 실패");
    }

    return publicUrl;
  };

  // 파일 업로드 로직
  const uploadImage = async (file: File): Promise<string> => {
    try {
      validateFile(file);
      const filePath = generateFilePath(file);
      await uploadToSupabase(file, filePath);
      return getPublicUrl(filePath);
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      throw error;
    }
  };

  // 동일한 파일 추가 로직 병합
  const handleFiles = async (files: File[]) => {
    if (images.length >= MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) =>
          uploadImage(file).catch((error) => {
            console.error(`${file.name} 업로드 중 이슈 발생 :`, error);
            return null;
          })
        )
      );
      const validUrls = uploadedUrls.filter((url): url is string => url !== null);
      const existingUrls = new Set(images);
      const newUrls = validUrls.filter((url) => !existingUrls.has(url));
      setImages([...images, ...newUrls]);
    } catch (error: any) {
      alert(error.message);
    }
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
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center z-10"
                onClick={() => {
                  const updatedImages = images.filter((_, i) => i !== index);
                  setImages(updatedImages);
                }}
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