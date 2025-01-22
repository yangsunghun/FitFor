"use client";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";

type TagFiltersProps = {
  selectedGroup: string | null;
};

const TagFilters = ({ selectedGroup }: TagFiltersProps) => {
  const { tags, handleToggleTag } = useSearchQuery();

  return (
    <>
      {TAG_GROUPS.filter((group) => !selectedGroup || group.key === selectedGroup).map((group) => (
        <div key={group.key}>
          <h2 className="mb-6 text-title1 font-bold mb:mb-0 mb:text-title2">{group.title}</h2>

          <div className="mb-6 flex flex-wrap gap-2 mb:hidden">
            {group.tags.map((tag) => (
              <button key={tag} onClick={() => handleToggleTag(group.key, tag)}>
                <Tags label={tag} variant={`${tags[group.key]?.includes(tag) ? "black" : "gray"}`} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default TagFilters;
