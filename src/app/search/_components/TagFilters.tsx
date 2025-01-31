"use client";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { memo } from "react";

type TagFiltersProps = {
  selectedGroup: string | null;
  tags: { [key: string]: string[] };
  handleToggleTag: (groupKey: string, tag: string) => void;
};

const TagFilters = memo(({ selectedGroup, tags, handleToggleTag }: TagFiltersProps) => {
  console.log("리렌더링 테스트");
  return (
    <>
      {selectedGroup
        ? TAG_GROUPS.filter((group) => !selectedGroup || group.key === selectedGroup).map((group) => (
            <div key={group.key}>
              <h2 className="mb-6 text-title1 font-bold mb:mb-0 mb:text-title2">{group.title}</h2>

              <div className="mb-6 flex flex-wrap gap-2 mb:hidden">
                {group.tags.map((tag) => (
                  <button key={tag} onClick={() => handleToggleTag(group.key, tag)}>
                    <Tags label={tag} variant={tags[group.key]?.includes(tag) ? "black" : "gray"} />
                  </button>
                ))}
              </div>
            </div>
          ))
        : TAG_GROUPS.map((group) => (
            <div key={group.key} className="mb-6">
              <p className="mb-2 text-[18px] font-bold">{group.title}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button key={tag} onClick={() => handleToggleTag(group.key, tag)}>
                    <Tags label={tag} variant={tags[group.key]?.includes(tag) ? "black" : "gray"} />
                  </button>
                ))}
              </div>
            </div>
          ))}
    </>
  );
});

export default TagFilters;
