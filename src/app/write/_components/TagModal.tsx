"use client";
import { Button } from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type TagModalProps = {
  selectedGroup: string | null;
  tags: { [key: string]: string[] };
  handleToggleTag: (groupKey: string, tag: string, updateTagsState?: (tags: string[]) => void) => void;
  resetTags: () => void;
  onClose: () => void;
  onSaveTags: (updatedTags: { [key: string]: string[] }) => void;
};

const TagModal = ({
  selectedGroup,
  tags: initialTags,
  handleToggleTag,
  resetTags,
  onClose,
  onSaveTags
}: TagModalProps) => {
  // activeTab 초기값 설정
  const [activeTab, setActiveTab] = useState(selectedGroup || TAG_GROUPS[0]?.key);
  // 로컬 상태: 부모에서 전달받은 tags를 기준으로 상태 초기화
  const [tags, setTags] = useState(initialTags);

  // 부모의 tags(initialTags)가 변경될 경우 로컬 상태도 동기화함
  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  // 그룹별 태그 토글 및 로컬 상태 업데이트
  const handleTagToggle = (groupKey: string, tag: string) => {
    handleToggleTag(groupKey, tag, (updatedTags) => {
      setTags((prevTags) => ({
        ...prevTags,
        // 선택 가능한 태그 목록에 해당하는 것만 필터링
        [groupKey]: updatedTags.filter((t) => TAG_GROUPS.find((g) => g.key === groupKey)?.tags.includes(t))
      }));
    });
  };

  // 태그 상태 초기화: 각 그룹에 대해 빈 배열로 초기화하여 체크박스가 모두 해제됨
  const handleResetTags = () => {
    const resetState = TAG_GROUPS.reduce(
      (acc, group) => {
        acc[group.key] = []; // 각 그룹의 태그 초기화
        return acc;
      },
      {} as { [key: string]: string[] }
    );
    setTags(resetState);
    resetTags();
  };

  // 적용하기 버튼 클릭 시 외부에 상태 전달
  const handleSave = () => {
    onSaveTags(tags);
    onClose();
  };

  // 선택된 태그 추출: 각 그룹별 선택된 태그를 flatMap으로 정리
  const selectedTags = Object.entries(tags).flatMap(([groupKey, groupTags]) =>
    groupTags.map((tag) => ({ groupKey, tag }))
  );

  return (
    <SlideOver title="필터" article="최대 7개까지 선택 가능해요" onClose={onClose}>
      {/* 탭 UI */}
      <div className="flex h-10 gap-1 px-2">
        {TAG_GROUPS.map((group) => {
          const isActive = activeTab === group.key;
          const selectedCount = tags[group.key]?.length || 0;

          return (
            <button
              key={group.key}
              onClick={() => setActiveTab(group.key)}
              className={`px-2 py-2 ${
                isActive
                  ? "font-medium text-primary-default"
                  : selectedCount > 0
                    ? "font-medium text-text-04"
                    : "text-text-04"
              }`}
            >
              {/* 그룹 제목과 선택된 개수 표시 */}
              {group.title}
              {selectedCount > 0 && (
                <span className={`ml-1 ${isActive ? "text-primary-default" : "text-text-04"}`}>{selectedCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 태그가 있을 때만 렌더링 */}
      {selectedTags.length > 0 && (
        <div className="relative bg-bg-02 px-4 py-2 text-caption font-medium text-text-03">
          <div className="flex flex-wrap items-start gap-2">
            {/* 태그 목록 */}
            <div className="flex flex-1 flex-wrap gap-2">
              {selectedTags.map(({ groupKey, tag }) => (
                <div
                  key={`${groupKey}-${tag}`}
                  className="flex items-center gap-1 rounded-[4px] border border-line-02 bg-bg-01 px-[8px] py-[4px] text-caption text-text-03"
                >
                  <span>{tag}</span>
                  <button onClick={() => handleTagToggle(groupKey, tag)}>
                    <X />
                  </button>
                </div>
              ))}
            </div>

            {/* 초기화 버튼 */}
            <div className="flex items-center text-caption font-medium">
              <button onClick={handleResetTags} className="pt-1 underline underline-offset-2">
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 선택된 탭에 따른 태그 그룹 렌더링 */}
      <div className="px-4">
        <div className="max-h-[400px] overflow-y-auto">
          {TAG_GROUPS.filter((group) => group.key === activeTab).map((group) => (
            <div key={group.key} className="py-4">
              <div
                className="grid gap-4 text-caption"
                style={{
                  gridTemplateColumns: group.tags.length > 10 ? "1fr 1fr" : "1fr"
                }}
              >
                {group.tags.map((tag) => (
                  <label key={tag} className="flex h-[23px] items-center gap-2">
                    <input
                      type="checkbox"
                      checked={tags[group.key]?.includes(tag) || false}
                      onChange={() => handleTagToggle(group.key, tag)}
                      className="h-[16px] w-[16px] rounded-[4px] accent-primary-default opacity-40 checked:opacity-100"
                    />
                    <span className="text-text-04">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 적용하기 버튼 */}
        <Button
          onClick={handleSave}
          disabled={selectedTags.length === 0}
          variant={selectedTags.length === 0 ? "disabled" : "primary"}
          size="md"
          className="mb-3 flex w-full items-center justify-center !py-3"
        >
          적용하기
        </Button>
      </div>
    </SlideOver>
  );
};

export default TagModal;
