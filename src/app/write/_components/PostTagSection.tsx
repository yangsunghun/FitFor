import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type PostTagSectionProps = {
  tags: string[];
  selectedCategory: string | null;
  onChangeCategory: (category: string) => void;
  toggleTagSelector: (tag: string, allTags: string[], max: number) => void;
  maxTags?: number;
};

const PostTagSection = ({
  tags,
  selectedCategory,
  onChangeCategory,
  toggleTagSelector,
  maxTags = 4
}: PostTagSectionProps) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategory === category) {
      onChangeCategory(""); // 이미 선택된 경우 해제
    } else {
      onChangeCategory(category); // 새로운 카테고리 선택 시 업데이트
    }
  };

  return (
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
                {selectedCategory === group.key && (
                  <div className="mt-4">
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
                )}
              </div>
              <hr className="border-t border-line-02" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostTagSection;
