"use client";

import { toast } from "@/lib/utils/common/toast";
import { useState } from "react";
import { UseFormStateHandlersReturn } from "./useFormStateHandlers";
import { getUpdatedTags } from "@/lib/utils/write/tag";

type UseTagHandlersProps = Pick<UseFormStateHandlersReturn, "formState"> & {
  handleFieldChange: <T extends keyof UseFormStateHandlersReturn["formState"]>(
    key: T,
    value: UseFormStateHandlersReturn["formState"][T]
  ) => void;
};

export const useTagHandlers = ({ formState, handleFieldChange }: UseTagHandlersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const Max = 7;
  // 카테고리 변경 핸들러
  const handleChangeCategory = (category: string) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
    }
  };

  // 토글선택 핸들러
  const toggleTagSelector = (groupKey: string, tag: string, max: number) => {
    const maxTotal = 7;
    const { updatedTags, error } = getUpdatedTags(formState.tags, groupKey, tag, maxTotal);
    if (error) return;
    handleFieldChange("tags", updatedTags);
  };

  return { selectedCategory, handleChangeCategory, toggleTagSelector };
};
