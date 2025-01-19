"use client";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";

const TagFilters = () => {
  const { tags, handleToggleTag } = useSearchQuery();

  return (
    <div className="mb-4">
      {TAG_GROUPS.map((group) => (
        <div key={group.key} className="mb-6">
          <p className="mb-2 text-[18px] font-bold">{group.title}</p>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <button key={tag} onClick={() => handleToggleTag(group.key, tag)}>
                <Tags label={tag} variant={`${tags[group.key]?.includes(tag) ? "black" : "gray"}`} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagFilters;
