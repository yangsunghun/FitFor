"use client";

import Dropdown from "@/components/ui/Dropdown";
import { CaretDown } from "@phosphor-icons/react";
import { memo, useCallback } from "react";

const sortOptions = [
  { key: "created_at", label: "최신순" },
  { key: "likes", label: "좋아요순" },
  { key: "view", label: "조회수순" }
];

type Props = {
  sort: string;
  handleSort: (key: string) => void;
};

const SortPosts = memo(({ sort, handleSort }: Props) => {
  const onSortChange = useCallback(
    (key: string) => {
      if (key !== sort) handleSort(key);
    },
    [sort, handleSort]
  );

  return (
    <Dropdown
      trigger={
        <div className="flex h-8 items-center gap-3 font-medium leading-8 mb:gap-2 mb:text-caption mb:text-text-03">
          {sortOptions.find((option) => option.key === sort)?.label || "선택"}
          <CaretDown weight="fill" />
        </div>
      }
      className="right-0 top-full"
    >
      <ul>
        {sortOptions.map((option) => (
          <li
            key={option.key}
            className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default mb:text-caption"
          >
            <button onClick={() => onSortChange(option.key)}>{option.label}</button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
});

SortPosts.displayName = "SortPosts";

export default SortPosts;
