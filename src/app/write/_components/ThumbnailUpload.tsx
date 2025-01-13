import React from 'react';
import Image from 'next/image';
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

type ThumbnailUploadProps = {
  thumbnail: string;
  onThumbnailUpload: (thumbnailUrl: string) => void; // 업로드된 URL을 전달받는 콜백
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  thumbnail,
  onThumbnailUpload,
}) => {
  const uploadThumbnail = async (file: File): Promise<string> => {
    try {
      // 파일 크기 확인
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
      }

      const timestamp = Date.now(); // 고유 파일명 생성용 타임스탬프
      const extension = file.name.split(".").pop() || "unknown"; // 파일 확장자 추출
      const uniqueFileName = `${timestamp}.${extension}`; // 고유 파일명 생성

      // 파일 경로 설정: post-images/thumbnail/고유 파일명
      const filePath = `thumbnail/${uniqueFileName}`;

      // Supabase Storage에 파일 업로드
      const { data, error } = await supabase.storage
        .from("post-images") // 버킷 이름
        .upload(filePath, file, {
          cacheControl: "3600", // 브라우저 캐시 설정
          upsert: false, // 동일 파일명 업로드 금지
        });

      if (error) {
        throw new Error(`썸네일 업로드 실패: ${error.message}`);
      }

      // 업로드된 파일의 공개 URL 생성
      const { publicUrl } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath).data;

      if (!publicUrl) {
        throw new Error("썸네일 URL 생성 실패");
      }

      return publicUrl; // 공개 URL 반환
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw error;
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // 모든 이미지 형식 허용
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const thumbnailUrl = await uploadThumbnail(file);
          onThumbnailUpload(thumbnailUrl); // 업로드 성공 시 부모 컴포넌트로 URL 전달
        } catch (error: any) {
          alert(error.message); // 오류 메시지 알림
        }
      }
    };
    fileInput.click();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const thumbnailUrl = await uploadThumbnail(file);
        onThumbnailUpload(thumbnailUrl); // 업로드 성공 시 부모 컴포넌트로 URL 전달
      } catch (error: any) {
        alert(error.message); // 오류 메시지 알림
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
            <strong>*권장 사이즈</strong><br />
            모바일 : 1920 x 1920, 최소 1400 x 1400 (1:1 비율)<br />
            PC : 1920 x 1080, 최소 1400 x 787 (16:9 비율)
          </p>
          <p className="text-sm text-red-500 mb-4">
            *최대 파일 크기: 5MB 이하의 이미지 파일만 업로드 가능합니다.
          </p>
          <button
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
            onClick={handleButtonClick}
          >
            커버 사진 추가하기
          </button>
        </>
      )}
    </div>
  );
};

export default ThumbnailUpload;