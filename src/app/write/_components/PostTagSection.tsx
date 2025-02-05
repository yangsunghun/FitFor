import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { getUpdatedTags } from "@/lib/utils/write/tag";
import { CaretDown, CaretRight, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";
import TagModal from "./TagModal";

type PostTagSectionProps = {
  tags: string[];
  selectedCategory: string | null;
  onChangeCategory: (category: string) => void;
  onChangeTags: (tags: string[]) => void;
  toggleTagSelector: (groupKey: string, tag: string, max: number) => void;
  maxTags?: number;
  isMissing?: boolean; // 필수 입력 경고 표시 여부
};

const PostTagSection = ({
  tags,
  selectedCategory,
  onChangeCategory,
  onChangeTags,
  toggleTagSelector,
  maxTags = 7,
  isMissing
}: PostTagSectionProps) => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategory === category) {
      onChangeCategory(""); // 이미 선택된 경우 해제
    } else {
      onChangeCategory(category); // 새로운 카테고리 선택 시 업데이트
    }
  };

  // TagModal에 전달할 태그 토글 핸들러
  const handleToggleTag = (groupKey: string, tag: string, updateTagsState?: (updatedTags: string[]) => void) => {
    const { updatedTags, error } = getUpdatedTags(tags, groupKey, tag, maxTags);
    if (error) return;
    onChangeTags(updatedTags);
    updateTagsState?.(updatedTags);
  };

  return (
    <>
      {/* Tablet(모바일) 레이아웃 */}
      <Tablet>
        <div className="cursor-pointer py-4" onClick={() => setIsTagModalOpen(true)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-title2 font-medium text-text-04 mb:text-body">태그</p>
              <p className="text-title2 font-medium text-primary-default mb:text-body">*</p>
            </div>
            <div className="flex items-center gap-2">
              {tags.length > 0 && (
                <p className="text-text-03">
                  <span className="text-primary-default">{tags.length}</span> / {maxTags}
                </p>
              )}
              <CaretRight size={20} className="text-text-03" />
            </div>
          </div>
          {tags.length === 0 ? (
            <p className="mt-[2px] text-text-03 mb:text-caption">게시물과 관련된 태그를 달아주세요.</p>
          ) : (
            <div className="mt-3 flex flex-row flex-wrap items-center gap-2 mb:mt-1">
              {tags.map((tag) => (
                <Tags key={tag} label={tag} variant="grayLine" size="sm" className="flex items-center justify-center" />
              ))}
            </div>
          )}
        </div>
        {isTagModalOpen && (
          <TagModal
            selectedGroup={null}
            tags={TAG_GROUPS.reduce(
              (acc, group) => {
                acc[group.key] = group.tags.filter((tag) => tags.includes(tag));
                return acc;
              },
              {} as { [key: string]: string[] }
            )}
            handleToggleTag={(groupKey, tag, updateTagsState) => {
              handleToggleTag(groupKey, tag, updateTagsState);
            }}
            resetTags={() => {
              onChangeTags([]);
            }}
            onClose={() => setIsTagModalOpen(false)}
            onSaveTags={(updatedTags) => {
              onChangeTags(Object.values(updatedTags).flat());
              setIsTagModalOpen(false);
            }}
          />
        )}
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
                            onClick={() => toggleTagSelector(group.key, tag, group.max)}
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
        {isMissing && <p className="pt-4 text-status-danger">주제와 관련된 태그를 추가해주세요.</p>}
      </MinTablet>
    </>
  );
};

export default PostTagSection;
