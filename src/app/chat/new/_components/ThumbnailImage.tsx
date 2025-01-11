import React, { useState } from "react";
import { FormDetails } from "../page";

interface ThumbnailImageProps {
  formData: FormDetails; // 전체 FormDetails 타입
  onNext: (data: Partial<FormDetails>) => void; // 다음 단계로 데이터를 전달하는 함수
  onPrev: () => void; // 이전 단계로 이동하는 함수
}

export default function ThumbnailImage({ formData, onNext, onPrev }: ThumbnailImageProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(formData.thumbnail || null);

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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
