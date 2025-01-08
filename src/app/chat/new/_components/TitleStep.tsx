import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TitleStepProps {
  formReturn: UseFormReturn;
}

const TitleStep = ({ formReturn }: TitleStepProps) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>채팅방 정보 입력</h2>
      <label>Title</label>
      <input {...register("title", { required: "Title is required" })} />
      <label>Subtitle</label>
      <input {...register("subtitle")} />
      <label>Description</label>
      <textarea {...register("description")} />
    </div>
  );
};

export default TitleStep;
