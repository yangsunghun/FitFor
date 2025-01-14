import React from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../page";

const Summary = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<FormDetails>();

  return (
    <div>
      <h2 className="text-lg mb-4 font-bold">제목 및 설명</h2>

      <div className="mb-4">
        <label htmlFor="title" className="text-sm mb-1 block font-medium">
          제목
        </label>
        <input
          id="title"
          {...register("title", { required: "제목은 필수 항목입니다." })}
          placeholder="제목을 입력하세요"
          className="w-full rounded-lg border p-2"
        />
        {errors.title && <p className="text-sm mt-1 text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="subtitle" className="text-sm mb-1 block font-medium">
          부제목
        </label>
        <input
          id="subtitle"
          {...register("subtitle", { required: "부제목은 필수 항목입니다." })}
          placeholder="부제목을 입력하세요"
          className="w-full rounded-lg border p-2"
        />
        {errors.subtitle && <p className="text-sm mt-1 text-red-500">{errors.subtitle.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="text-sm mb-1 block font-medium">
          설명
        </label>
        <textarea
          id="description"
          {...register("description", { required: "설명은 필수 항목입니다." })}
          placeholder="설명을 입력하세요"
          className="w-full rounded-lg border p-2"
          rows={4}
        />
        {errors.description && <p className="text-sm mt-1 text-red-500">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default Summary;
