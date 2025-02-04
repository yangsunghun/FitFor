import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { CaretDown, CaretRight, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";
import TagModal from "./TagModal";
import { getUpdatedTags } from "@/lib/utils/write/tag";

type PostTagSectionProps = {
  tags: string[];
  selectedCategory: string | null;
  onChangeCategory: (category: string) => void;
  toggleTagSelector: (tag: string, allTags: string[], max: number, updateTagsState?: (tags: string[]) => void) => void;
  maxTags?: number;
};

const PostTagSection = ({
  tags: initialTags,
  selectedCategory,
  onChangeCategory,
  toggleTagSelector,
  maxTags = 7
}: PostTagSectionProps) => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [tags, setTags] = useState(initialTags); // 태그 상태 관리

  const handleCategoryToggle = (category: string) => {
    if (selectedCategory === category) {
      onChangeCategory(""); // 이미 선택된 경우 해제
    } else {
      onChangeCategory(category); // 새로운 카테고리 선택 시 업데이트
    }
  };

    // TagModal에 전달할 태그 토글 핸들러 (부모 state 직접 업데이트)
    const handleToggleTag = (
      groupKey: string,
      tag: string,
      updateTagsState?: (updatedTags: string[]) => void
    ) => {
      const { updatedTags, error } = getUpdatedTags(tags, groupKey, tag, maxTags);
      if (error) return;
      // 부모 state 업데이트
      setTags(updatedTags);
      // 모달 내부 로컬 상태 동기화를 위한 콜백 호출 (존재할 경우)
      updateTagsState?.(updatedTags);
    };

  return (
    <>
      {/* Tablet(모바일) 레이아웃 */}
      <Tablet>
        <div className="flex cursor-pointer items-center justify-between py-4" onClick={() => setIsTagModalOpen(true)}>
          <div className="flex flex-col gap-1">
            <div className="flex">
              <p className="font-medium text-text-04">태그</p>
              <p className="font-medium text-primary-default">*</p>
            </div>
            <span className="text-caption font-medium text-text-03">
              {tags.length === 0 ? "게시물과 관련된 태그를 달아주세요." : tags.join(", ")}
            </span>
          </div>
          <CaretRight size={20} className="text-text-03" />
        </div>
      </Tablet>

      {/* MinTablet(태블릿 이상, 데스크탑) 레이아웃 */}
      <MinTablet>
        <div className="space-y-2 pt-10">
          {/* 상단 제목 섹션 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-title2 font-bold text-text-04">게시물 주제를 선택해주세요.</p>
              <p className="text-title2 font-bold text-primary-default">*</p>
            </div>
            <p className="text-text-04">
              <span className="text-primary-default">{tags.length}</span> / {maxTags}
            </p>
          </div>

          {/* 각 태그 그룹 정렬 */}
          <div className="space-y-2">
            {TAG_GROUPS.map((group) => {
              const selectedTags = group.tags.filter((tag) => tags.includes(tag));
              return (
                <div key={group.key} className="pb-2">
                  <div className="py-5">
                    {/* 태그 그룹 제목 및 토글 아이콘 */}
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(group.key)}
                      className="flex w-full justify-between"
                    >
                      <span className="text-title2 font-medium">{group.title}</span>
                      {selectedCategory === group.key ? (
                        <CaretUp size={24} className="text-text-03" />
                      ) : (
                        <CaretDown size={24} className="text-text-03" />
                      )}
                    </button>

                    {selectedTags.length > 0 && <p className="mt-1 text-text-03">{selectedTags.join(", ")}</p>}

                    {/* 토글이 열렸을 때만 태그 선택 UI 표시 */}
                    <div
                      className={`overflow-hidden ${
                        selectedCategory === group.key
                          ? "mt-4 opacity-100 transition-all duration-300 ease-in-out"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {group.tags.map((tag) => (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggleTagSelector(tag, group.tags, group.max)}
                            className="focus:outline-none"
                          >
                            <Tags
                              label={tag}
                              variant={tags.includes(tag) ? "gray" : "grayLine"}
                              size="md"
                              className={`${tags.includes(tag) ? "border-line-02" : ""} cursor-pointer`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-line-02" />
                </div>
              );
            })}
          </div>
        </div>
      </MinTablet>

      {isTagModalOpen && (
        <TagModal
        selectedGroup={null}
        tags={TAG_GROUPS.reduce((acc, group) => {
          // 부모 상태의 tags 배열에서 각 그룹에 해당하는 태그만 필터링합니다
          acc[group.key] = group.tags.filter((tag) => tags.includes(tag));
          return acc;
        }, {} as { [key: string]: string[] })}
        handleToggleTag={(groupKey, tag, updateTagsState) => {
          // 여기서도 위의 handleToggleTag 함수를 그대로 사용하여 부모 state를 업데이트합니다
          handleToggleTag(groupKey, tag, updateTagsState);
        }}
        resetTags={() => {
          setTags([]);
        }}
        onClose={() => setIsTagModalOpen(false)}
        onSaveTags={(updatedTags) => {
          // 모든 그룹의 태그를 flat하게 합쳐서 부모 state 업데이트합니다
          setTags(Object.values(updatedTags).flat());
          setIsTagModalOpen(false);
        }}
      />
      )}
    </>
  );
};

export default PostTagSection;
