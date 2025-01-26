"use client";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { X } from "@phosphor-icons/react";

type TagCheckFiltersProps = {
  selectedGroup: string | null;
  tags: { [key: string]: string[] };
  handleToggleTag: (groupKey: string, tag: string) => void;
  resetTags: () => void;
};

const TagCheckFilters = ({ selectedGroup, tags, handleToggleTag, resetTags }: TagCheckFiltersProps) => {
  // 선택된 태그
  const selectedTags = Object.entries(tags).flatMap(([groupKey, groupTags]) =>
    groupTags.map((tag) => ({ groupKey, tag }))
  );

  return (
    <>
      <div className="relative flex flex-wrap justify-between bg-bg-02 text-caption font-medium text-text-03">
        {selectedTags.length > 0 && (
          <div className="inner flex flex-wrap gap-2 py-[12px] pr-[33px]">
            {selectedTags.map(({ groupKey, tag }) => (
              <div
                key={tag}
                className="flex items-center gap-1 rounded-[4px] border border-line-02 bg-bg-01 px-[8px] py-[4px] text-caption text-text-03"
              >
                <span>{tag}</span>
                <button onClick={() => handleToggleTag(groupKey, tag)}>
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
        {selectedTags.length !== 0 && (
          <button onClick={resetTags} className="absolute right-[4.275%] top-[12px] underline underline-offset-2">
            초기화
          </button>
        )}
      </div>

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
