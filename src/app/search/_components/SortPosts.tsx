import { CaretDown } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button onClick={() => setIsOpen(!isOpen)} className="flex h-8 items-center gap-3 font-medium leading-8">
        {sortOptions.find((option) => option.key === sort)?.label || "선택"}
        <CaretDown
          weight="fill"
          className={clsx({
            "rotate-180": isOpen,
            "rotate-0": !isOpen
          })}
        />
      </button>

      <div
        className={clsx(
          "absolute right-0 top-full z-20 overflow-hidden rounded-lg bg-bg-01 shadow-md transition duration-200",
          {
            "opacity-100": isOpen,
            "opacity-0": !isOpen
          }
        )}
        style={{
          transformOrigin: "top right"
        }}
      >
        <ul>
          {sortOptions.map((option) => (
            <li
              key={option.key}
              className={clsx(
                "w-full px-4 py-2 text-left transition duration-300 hover:bg-primary-default hover:text-white",
                {
                  "bg-primary-default text-white": sort === option.key
                }
              )}
            >
              <button
                onClick={() => {
                  handleSort(option.key);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default SortPosts;
