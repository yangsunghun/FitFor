"use client";

import { useState } from "react";
import { UseFormStateHandlersReturn } from "./useFormStateHandlers";

type UsePurchaseHandlersProps = Pick<UseFormStateHandlersReturn, "formState" | "handleChange">;

export const useTagHandlers = ({ formState, handleChange }: UsePurchaseHandlersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 변경 핸들러
  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    handleChange("tags", []); // 카테고리 변경 시 태그 초기화
  };

  // 토글선택 핸들러
  const toggleTagSelector = (tag: string, groupTags: string[], max: number) => {
    const selectedGroupTags = formState.tags.filter((t) => groupTags.includes(t));

    // 전체 태그 수 제한 (최대 7개)
    if (!selectedGroupTags.includes(tag) && formState.tags.length >= 7) {
      alert("최대 7개의 태그만 선택 가능합니다.");
      return;
    }

    // 그룹별 태그 선택/해제
    if (selectedGroupTags.includes(tag)) {
      handleChange(
        "tags",
        formState.tags.filter((t) => t !== tag) // 태그 제거
      );
    } else if (selectedGroupTags.length < max) {
      handleChange(
        "tags",
        [...formState.tags, tag] // 태그 추가
      );
    } else {
      alert(`해당 주제는 최대 ${max}개의 태그만 선택 가능합니다.`);
    }
  };

  return { selectedCategory, handleChangeCategory, toggleTagSelector };
};
