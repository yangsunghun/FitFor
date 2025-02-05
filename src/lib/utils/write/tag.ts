"use client";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { toast } from "@/lib/utils/common/toast";

export const getUpdatedTags = (
  currentTags: string[],
  groupKey: string,
  tag: string,
  maxTotal: number
): { updatedTags: string[]; error?: string } => {
  const groupData = TAG_GROUPS.find((g) => g.key === groupKey);
  const groupTags = groupData?.tags || [];
  // 그룹별 최대 선택 가능 개수, 없으면 전체 maxTotal 사용
  const groupMax = groupData && (groupData as any).max ? (groupData as any).max : maxTotal;
  // 해당 그룹에 현재 선택된 태그들
  const selectedGroupTags = currentTags.filter((t) => groupTags.includes(t));

  let updatedTags: string[] = [];
  if (currentTags.includes(tag)) {
    // 이미 선택된 경우 태그 제거
    updatedTags = currentTags.filter((t) => t !== tag);
  } else {
    // 전체 태그 수 제한 체크
    if (currentTags.length >= maxTotal) {
      toast(`최대 ${maxTotal}개의 태그만 선택 가능합니다.`, "warning");
      return { updatedTags: currentTags, error: `최대 ${maxTotal}개의 태그만 선택 가능합니다.` };
    }
    // 그룹별 태그 수 제한 체크
    if (selectedGroupTags.length >= groupMax) {
      toast(`해당 주제는 ${groupMax}개의 태그만 선택 가능합니다.`, "warning");
      return { updatedTags: currentTags, error: `해당 주제는 최대 ${groupMax}개의 태그만 선택 가능합니다.` };
    }
    // 태그 추가
    updatedTags = [...currentTags, tag];
  }
  return { updatedTags };
};
