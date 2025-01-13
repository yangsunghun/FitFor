import React, { useState } from "react";
import { FormDetails } from "../page";
import { ThumbnailModal } from "./ThumbnailModal";
import Image from "next/image";

interface ThumbnailImageProps {
  formData: FormDetails; // 전체 FormDetails 타입
  onNext: (data: Partial<FormDetails>) => void; // 다음 단계로 데이터를 전달하는 함수
  onPrev: () => void; // 이전 단계로 이동하는 함수
}

export default function ThumbnailImage({ formData, onNext, onPrev }: ThumbnailImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [thumbnail, setThumbnail] = useState<File | null>(formData.thumbnail || null);

  const handleUpload = (file: File | null) => {
    if (file) {
      setThumbnail(file);
      console.log("Uploaded file:", file);
    }
  };
  const handleSubmit = () => {
    onNext({ thumbnail });
  };

  return (
    <div>
      <h2>Thumbnail</h2>
      {/* Summary 단계에서 입력한 title과 subtitle 표시 */}
      <p>
        <strong>Title:</strong> {formData.title}
      </p>
      <p>
        <strong>Subtitle:</strong> {formData.subtitle}
      </p>

      {/* 사진 추가하기 버튼 */}
      <button onClick={() => setIsModalOpen(true)}>사진 추가하기</button>

      {/* 미리보기 */}
      {thumbnail && (
        <div className="mt-4">
          <Image
            src={URL.createObjectURL(thumbnail)}
            alt="미리보기"
            className="mt-2 h-40 w-40 rounded object-cover"
            width={100}
            height={100}
          />
        </div>
      )}

      <ThumbnailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />

      <button onClick={onPrev}>Previous</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
