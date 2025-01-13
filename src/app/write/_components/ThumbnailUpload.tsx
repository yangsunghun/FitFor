import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

type ThumbnailUploadProps = {
  thumbnail: string;
  onThumbnailUpload: (thumbnailUrl: string) => void; // 업로드된 URL을 전달받는 콜백
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const BUCKET_NAME = "post-images"; // 버킷 이름
const THUMBNAIL_PATH = "thumbnail"; // 썸네일 파일 경로

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  thumbnail,
  onThumbnailUpload,
}) => {
  // 파일 업로드 로직
  const uploadThumbnail = async (file: File): Promise<string> => {
    try {
      validateFile(file);
      const filePath = generateFilePath(file);
      await uploadToSupabase(file, filePath);
      return getPublicUrl(filePath);
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw error;
    }
  };

  // 파일 크기 확인
  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
    }
  };

  // 고유 파일 경로 생성
  const generateFilePath = (file: File): string => {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "unknown";
    return `${THUMBNAIL_PATH}/${timestamp}.${extension}`;
  };

  // Supabase 스토리지에 파일 업로드
  const uploadToSupabase = async (file: File, filePath: string) => {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`썸네일 업로드 실패: ${error.message}`);
    }
  };

  // 업로드된 파일의 공개 URL 가져오기
  const getPublicUrl = (filePath: string): string => {
    const { publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath).data;

    if (!publicUrl) {
      throw new Error("썸네일 URL 생성 실패");
    }

    return publicUrl;
  };

  // 파일 선택 버튼 클릭 처리
  const handleFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const thumbnailUrl = await uploadThumbnail(file);
          onThumbnailUpload(thumbnailUrl);
        } catch (error: any) {
          alert(error.message);
        }
      }
    };
    fileInput.click();
  };

  // 드래그 앤 드롭 처리
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      try {
        const thumbnailUrl = await uploadThumbnail(file);
        onThumbnailUpload(thumbnailUrl);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div
      className="w-full h-[400px] bg-gray-100 flex flex-col items-center justify-center text-center rounded-lg relative p-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {thumbnail ? (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={thumbnail}
            alt="Thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      ) : (
        <>
          <p className="text-lg font-bold mb-2">
            드래그 인 드롭이나 추가하기 버튼으로 <br /> 커버 사진을 업로드해주세요.
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <strong>*권장 사이즈</strong>
            <br />
            모바일 : 1920 x 1920, 최소 1400 x 1400 (1:1 비율)
            <br />
            PC : 1920 x 1080, 최소 1400 x 787 (16:9 비율)
          </p>
          <p className="text-sm text-red-500 mb-4">
            *최대 파일 크기: 5MB 이하의 이미지 파일만 업로드 가능합니다.
          </p>
          <button
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
            onClick={handleFileInput}
          >
            커버 사진 추가하기
          </button>
        </>
      )}
    </div>
  );
};

export default ThumbnailUpload;