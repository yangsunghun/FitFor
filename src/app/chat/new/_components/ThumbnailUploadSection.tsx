import Image from "next/image";
import { Image as IconImage } from "@phosphor-icons/react";
import React from "react";

type ThumbnailUploadSectionProps = {
  thumbnail: File | null; // null일 경우 미리보기 없음
  onChange: (file: File) => void; // 파일 업로드 핸들러
  error?: string; // 에러 메시지
};

const ThumbnailUploadSection = ({ thumbnail, onChange, error }: ThumbnailUploadSectionProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file); // 파일이 있으면 업로드 핸들러 호출
    }
  };

  return (
    <div className="space-y-4 pt-10">
      {/* 제목 */}
      <div className="flex items-center gap-2">
        <span className="text-title2 font-bold text-text-04">썸네일 이미지</span>
        <span className="text-title2 font-bold text-primary-default">*</span>
      </div>

      {/* 이미지 미리보기 및 업로드 섹션 */}
      <div className="flex items-center gap-6">
        {/* 이미지 미리보기 */}
        <div className="relative h-32 w-24 overflow-hidden rounded-lg bg-bg-02">
          {thumbnail ? (
            <Image src={URL.createObjectURL(thumbnail)} alt="미리보기" layout="fill" objectFit="cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-body text-text-02">
              <IconImage size={24} />
            </div>
          )}
        </div>

        {/* 업로드 정보와 버튼 */}
        <div className="flex flex-col gap-4">
          {/* 추천 사이즈 및 포맷 */}
          <div className="space-y-1">
            <p className="text-body font-medium text-text-03">추천 사이즈: 190x250</p>
            <p className="text-body font-medium text-text-03">JPG, PNG, 최대 10MB</p>
          </div>

          {/* 업로드 버튼 - 수정 필요 */}
          <div>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer rounded-lg bg-text-04 px-4 py-2 text-white hover:bg-text-03"
            >
              이미지 업로드
            </label>
          </div>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-sm mt-2 text-red-600">{error}</p>}
    </div>
  );
};

export default ThumbnailUploadSection;
