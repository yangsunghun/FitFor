import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../page";
import { ThumbnailModal } from "./ThumbnailModal";
import Image from "next/image";

const ThumbnailImage = () => {
  const { setValue, watch, register, formState: { errors } } = useFormContext<FormDetails>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const thumbnail = watch("thumbnail");

  // React Hook Form에 등록
  register("thumbnail", {
    required: "썸네일 이미지는 필수 항목입니다.",
  });

  const handleUpload = (file: File | null) => {
    if (file) {
      setValue("thumbnail", file); // 업로드한 파일 설정
    }
  }; // 썸네일 이미지파일 null 처리 고민중..

  return (
    <div className="flex h-[600px] flex-col items-center justify-center">
      <h2 className="text-lg mb-4 font-bold">Thumbnail</h2>

      <div className="relative flex h-96 w-96 items-center justify-center rounded-lg bg-gray-200">
        {!thumbnail ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white"
            aria-label="사진 추가하기"
          >
            사진 추가하기
          </button>
        ) : (
          <div className="relative">
            <Image
              src={URL.createObjectURL(thumbnail as File)}
              alt="업로드된 사진 미리보기"
              className="rounded-lg object-cover"
              width={384}
              height={384}
            />
            <button
              onClick={() => setValue("thumbnail", null as unknown as File)}
              className="absolute right-2 top-2 rounded-full bg-red-500 px-3 py-2 text-white"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 에러 메시지 표시 */}
      {errors.thumbnail && (
        <p className="mt-2 text-red-500 text-sm">
          {errors.thumbnail.message}
        </p>
      )}

      <ThumbnailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />
    </div>
  );
};

export default ThumbnailImage;
