import React from "react";
import { useFormContext } from "react-hook-form";
import { FormDetails } from "../page";

const CATEGORY_OPTIONS = ["Label1", "Label2", "Label3", "Label4", "Label5"];

const Tags = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<FormDetails>();

  const category = watch("category");
  const hashtags = watch("hashtags") || [];

  // 카테고리 선택 핸들러
  const handleCategorySelect = (selectedCategory: string) => {
    setValue("category", selectedCategory);
  };

  // 해시태그 추가 핸들러
  const handleAddHashtag = (tag: string) => {
    if (tag && !hashtags.includes(tag)) {
      setValue("hashtags", [...hashtags, tag]);
    }
  };

  // 해시태그 제거 핸들러
  const handleRemoveHashtag = (tag: string) => {
    setValue(
      "hashtags",
      hashtags.filter((t) => t !== tag)
    );
  };

  // React Hook Form에 필드 등록
  register("category", {
    required: "카테고리를 선택해주세요."
  });
  register("hashtags"); // 선택 사항으로 등록만 처리

  return (
    <div className="p-6">
      {/* 카테고리 선택 섹션 */}
      <div className="mb-6">
        <h2 className="text-lg mb-2 font-bold">카테고리 선택</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleCategorySelect(option)}
              className={`rounded-full border px-4 py-2 ${
                category === option ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.category && <p className="text-sm mt-1 text-red-500">{errors.category.message}</p>}
      </div>

      {/* 해시태그 입력 섹션 */}
      <div>
        <h2 className="text-lg mb-2 font-bold">해시태그 추가</h2>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="해시태그 입력"
            className="flex-1 rounded-lg border px-4 py-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget.value.trim();
                if (input) {
                  handleAddHashtag(input);
                  e.currentTarget.value = "";
                }
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span key={tag} className="flex items-center gap-2 rounded-full border bg-gray-200 px-4 py-2 text-black">
              #{tag}
              <button onClick={() => handleRemoveHashtag(tag)}>✕</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
