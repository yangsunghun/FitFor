"use client";

import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";

const TagFilters = () => {
  const { tags, toggleTag } = useSearchQuery();

  const availableTags = ["봄", "여름", "가을", "겨울"];

  return (
    <div className="mb-4 flex gap-2">
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`rounded px-4 py-2 ${tags.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilters;
