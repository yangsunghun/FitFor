"use client";

import Dropdown from "@/components/ui/Dropdown";
import { CaretDown } from "@phosphor-icons/react";

const sortOptions = [
  { key: "created_at", label: "최신순" },
  { key: "likes", label: "좋아요순" },
  { key: "view", label: "조회수순" }
];

type Props = {
  sort: string;
  handleSort: (key: string) => void;
};

const SortPosts = ({ sort, handleSort }: Props) => {
  return (
    <div className="relative flex justify-end">
      <Dropdown
        trigger={
          <div className="flex h-8 items-center gap-3 font-medium leading-8">
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
              className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default"
            >
              <button
                onClick={() => {
                  handleSort(option.key);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default SortPosts;
