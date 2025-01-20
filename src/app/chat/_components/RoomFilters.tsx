"use client";

import { useState } from "react";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { Tags } from "@/components/ui/Tags";

const Filter = ({ onFilterChange }: { onFilterChange: (tags: { [key: string]: string[] }) => void }) => {
  const [activeTab, setActiveTab] = useState(TAG_GROUPS[0].key);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string[] }>({});

  // 탭 전환
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // 태그 선택/해제
  const handleToggleTag = (key: string, tag: string) => {
    const updatedTags = { ...selectedTags };

    if (!updatedTags[key]) {
      updatedTags[key] = [];
    }

    if (updatedTags[key].includes(tag)) {
      updatedTags[key] = updatedTags[key].filter((t) => t !== tag);
    } else {
      if (updatedTags[key].length >= 2) {
        alert("태그는 최대 2개까지만 선택할 수 있습니다.");
        return;
      }
      updatedTags[key].push(tag);
    }

    setSelectedTags(updatedTags);
    onFilterChange(updatedTags);
  };

  return (
    <div>
      {/* 탭 그룹 */}
      <div className="mb-10 flex gap-4 border-b text-title2 font-medium">
        {TAG_GROUPS.map((group) => (
          <button
            key={group.key}
            onClick={() => handleTabChange(group.key)}
            className={`px-4 py-2 ${activeTab === group.key ? "border-b-2 border-black text-text-04" : "text-text-02"}`}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* 현재 활성화된 탭의 태그 버튼 */}
      <div className="flex flex-wrap gap-2">
        {TAG_GROUPS.find((group) => group.key === activeTab)?.tags.map((tag) => (
          <button key={tag} onClick={() => handleToggleTag(activeTab, tag)}>
            <Tags label={tag} variant={`${selectedTags[activeTab]?.includes(tag) ? "black" : "gray"}`} size="md" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
