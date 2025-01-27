import Image from "next/image";
import { Image as IconImage } from "@phosphor-icons/react";
import React, { useRef } from "react";
import { Desktop, Mobile } from "@/components/common/BreakPoints";

type ThumbnailUploadSectionProps = {
  thumbnail: File | null; // null일 경우 미리보기 없음
  onChange: (file: File) => void; // 파일 업로드 핸들러
  error?: string; // 에러 메시지
};

const ThumbnailUploadSection = ({ thumbnail, onChange, error }: ThumbnailUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file); // 파일이 있으면 업로드 핸들러 호출
    }
  };

  const handlePreviewClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 pt-10">
      {/* 제목 */}
      <div className="flex items-center gap-2">
        <span className="text-title2 font-bold text-text-04 mb:text-body mb:font-medium">썸네일 이미지</span>
        <span className="text-title2 font-bold text-primary-default mb:text-body mb:font-medium">*</span>
      </div>

      {/* 이미지 미리보기 및 업로드 섹션 */}
      <div className="flex items-center gap-6">
        {/* 이미지 미리보기 */}
        <div
          className="relative h-32 w-24 cursor-pointer overflow-hidden rounded-lg bg-bg-02"
          onClick={handlePreviewClick}
        >
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
          <div className="relative rounded-md bg-black px-3 py-2 text-small font-medium text-text-01 hidden mb:block">
            이미지 박스를 눌러주세요.
            <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 transform bg-black"></div>
          </div>

          <div className="space-y-1">
            <p className="text-body font-medium text-text-03 mb:text-caption ">추천 사이즈: 190x250</p>
            <p className="text-body font-medium text-text-03 mb:text-caption">JPG, PNG, 최대 5MB</p>
          </div>

          {/* 업로드 버튼 */}
          <div>
            <input
              ref={fileInputRef} // ref를 input에 연결
              id="thumbnail-upload"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer rounded-lg bg-text-04 px-4 py-2 text-white hover:bg-text-03 mb:hidden"
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
