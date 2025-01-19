import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";

type TagSectionProps = {
  title: string; 
  tags: string[];
  selectedCategory: string | null;
  onChangeCategory: (category: string) => void;
  toggleTagSelector: (tag: string, allTags: string[], max: number) => void;
};

const TagSection = ({ title, tags, selectedCategory, onChangeCategory, toggleTagSelector }: TagSectionProps) => {
  const selectedGroup = TAG_GROUPS.find((group) => group.key === selectedCategory);

  return (
    <div className="space-y-2 pt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-title2 font-bold text-text-04">{title}</p>
          <p className="text-title2 font-bold text-primary-default">*</p>
        </div>
        <p className="text-sm text-body text-text-04">{tags.length} / 7</p>
      </div>
  
      {/* 주제 선택 버튼 */}
      <div className="flex flex-wrap gap-2">
        {TAG_GROUPS.map((group) => (
          <button
            key={group.key}
            onClick={() => onChangeCategory(group.key)}
            className="focus:outline-none"
          >
            <Tags
              label={group.title}
              variant={selectedCategory === group.key ? "gray" : "grayLine"}
              size="md"
              className={`${selectedCategory === group.key ? "border-line-02" : ""} cursor-pointer`}
            />
          </button>
        ))}
      </div>
  
      {/* 선택된 카테고리의 태그 */}
      {selectedGroup && (
        <div className="space-y-2">
          <p className="text-title2 pt-10 font-bold">태그</p>
          <div className="flex flex-wrap gap-2">
            {selectedGroup.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTagSelector(tag, selectedGroup.tags, selectedGroup.max)}
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
  );
};

export default TagSection;