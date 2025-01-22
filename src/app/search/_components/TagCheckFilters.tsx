"use client";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { X } from "@phosphor-icons/react";

type TagCheckFiltersProps = {
  selectedGroup: string | null;
};

const TagCheckFilters = ({ selectedGroup }: TagCheckFiltersProps) => {
  const { tags, handleToggleTag } = useSearchQuery();

  // 선택된 태그
  const selectedTags = Object.entries(tags).flatMap(([groupKey, groupTags]) =>
    groupTags.map((tag) => ({ groupKey, tag }))
  );

  return (
    <>
      {/* 선택된 태그 표시 */}
      <div className="bg-bg-02">
        {selectedTags.length > 0 && (
          <div className="inner flex flex-wrap gap-3 py-[12px] text-caption font-medium text-text-03">
            {selectedTags.map(({ groupKey, tag }) => (
              <div key={tag} className="flex items-center gap-1">
                <span>{tag}</span>
                <button onClick={() => handleToggleTag(groupKey, tag)}>
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 태그 필터 UI */}
      {TAG_GROUPS.filter((group) => !selectedGroup || group.key === selectedGroup).map((group) => (
        <div key={group.key} className="inner flex max-h-[380px] flex-col flex-wrap gap-4 py-4 text-caption">
          {group.tags.map((tag) => (
            <label key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tags[group.key]?.includes(tag) || false}
                onChange={() => handleToggleTag(group.key, tag)}
                className="h-[16px] w-[16px] rounded-[4px] accent-primary-default opacity-40 checked:opacity-100"
              />
              <span className="text-sm">{tag}</span>
            </label>
          ))}
        </div>
      ))}
    </>
  );
};

export default TagCheckFilters;
