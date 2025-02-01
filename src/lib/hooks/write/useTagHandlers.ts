"use client";

import { toast } from "@/lib/utils/common/toast";
import { useState } from "react";
import { UseFormStateHandlersReturn } from "./useFormStateHandlers";

type UseTagHandlersProps = Pick<UseFormStateHandlersReturn, "formState"> & {
  handleFieldChange: <T extends keyof UseFormStateHandlersReturn["formState"]>(
    key: T,
    value: UseFormStateHandlersReturn["formState"][T]
  ) => void;
};

export const useTagHandlers = ({ formState, handleFieldChange }: UseTagHandlersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리 변경 핸들러
  const handleChangeCategory = (category: string) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
    }
  };

  // 토글선택 핸들러
  const toggleTagSelector = (tag: string, groupTags: string[], max: number) => {
    const selectedGroupTags = formState.tags.filter((t) => groupTags.includes(t));

    // 전체 태그 수 제한 (최대 7개)
    if (!selectedGroupTags.includes(tag) && formState.tags.length >= 7) {
      toast("최대 7개의 태그만 선택 가능합니다.", "warning");
      return;
    }

    // 그룹별 태그 선택/해제 처리
    let updatedTags: string[]; // 변수 선언 추가

    // 그룹별 태그 선택/해제
    if (selectedGroupTags.includes(tag)) {
      updatedTags = formState.tags.filter((t) => t !== tag); // 태그 제거
    } else if (selectedGroupTags.length < max) {
      updatedTags = [...formState.tags, tag]; // 태그 추가
    } else {
      toast(`해당 주제는 최대 ${max}개의 태그만 선택 가능합니다.`, "warning");
      return;
    }

    // 상태를 handleFieldChange로 업데이트
    handleFieldChange("tags", updatedTags);
  };

  return { selectedCategory, handleChangeCategory, toggleTagSelector };
};
