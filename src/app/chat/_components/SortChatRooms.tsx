"use client";

import Dropdown from "@/components/ui/Dropdown";
import { CaretDown } from "@phosphor-icons/react";

const sortOptions = [
  { key: "created_at", label: "최신순" },
  // { key: "", label: "인기순" } fevertime 적용 여부 확인 필요함..
];

type Props = {
  sort: string;
  handleSort: (key: string) => void;
};

const SortChatRooms = ({ sort, handleSort }: Props) => {

  return (
    <Dropdown
      trigger={
        <div className="flex h-8 items-center gap-3 font-medium leading-8 mb:gap-2 mb:text-caption mb:text-text-03">
          {sortOptions.find((option) => option.key === sort)?.label || "정렬 기준"}
          <CaretDown weight="fill" />
        </div>
      }
    >
      <ul>
        {sortOptions.map((option) => (
          <li
            key={option.key}
            className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default mb:text-caption"
          >
            <button onClick={() => handleSort(option.key)}>{option.label}</button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default SortChatRooms;
