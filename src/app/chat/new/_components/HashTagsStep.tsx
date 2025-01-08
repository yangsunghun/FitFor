import React from "react";
import { UseFormReturn } from "react-hook-form";

interface HashTagsStepProps {
  formReturn: UseFormReturn;
}

const HashTagsStep = ({ formReturn }: HashTagsStepProps) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>해시태그 입력</h2>
      <input {...register("hashTags")} placeholder="쉼표로 구분된 태그" />
    </div>
  );
};

export default HashTagsStep;
