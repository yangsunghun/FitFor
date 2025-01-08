import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ThumbnailStepProps {
  formReturn: UseFormReturn;
}

const ThumbnailStep = ({ formReturn }: ThumbnailStepProps) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>썸네일 이미지 업로드</h2>
      <input
        type="file"
        {...register("thumbnailFile", {
          required: "Thumbnail image is required"
        })}
      />
    </div>
  );
};

export default ThumbnailStep;
