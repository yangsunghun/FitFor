import React, { useEffect, useState } from "react";
import { FormDetails } from "../page"; // 부모 컴포넌트에서 사용하는 FormDetails 타입

interface HashTagsProps {
  formData: FormDetails;
  setFormData: React.Dispatch<React.SetStateAction<FormDetails>>;
  onCreateChatRoom: () => Promise<void>;
  onPrev: () => void;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const CATEGORY_OPTIONS = ["Label1", "Label2", "Label3", "Label4", "Label5"];

const Tags: React.FC<HashTagsProps> = ({ formData, setFormData, onPrev, onCreateChatRoom, loading }) => {
  const [category, setCategory] = useState<string>(formData.category || "");
  const [hashtags, setHashtags] = useState<string[]>(formData.hashtags || []);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setFormData((prev) => ({ ...prev, category: selectedCategory }));
  };

  // 해시태그 추가 핸들러
  const handleAddHashtag = (tag: string) => {
    if (tag && !hashtags.includes(tag)) {
      const updatedHashtags = [...hashtags, tag];
      setHashtags(updatedHashtags);
      setFormData((prev) => ({ ...prev, hashtags: updatedHashtags }));
    }
  };

  // 해시태그 제거 핸들러
  const handleRemoveHashtag = (tag: string) => {
    const updatedHashtags = hashtags.filter((t) => t !== tag);
    setHashtags(updatedHashtags);
    setFormData((prev) => ({ ...prev, hashtags: updatedHashtags }));
  };

  // formData로 초기 상태 설정
  useEffect(() => {
    setCategory(formData.category);
    setHashtags(formData.hashtags);
  }, [formData]);

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

      {/* 하단 버튼 */}
      <div className="mt-8 flex justify-between">
        <button onClick={onPrev} className="rounded-lg bg-gray-200 px-6 py-2 text-black" disabled={loading}>
          이전
        </button>
        <button onClick={onCreateChatRoom} className="rounded-lg bg-black px-6 py-2 text-white" disabled={loading}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Tags;