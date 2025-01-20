import { CaretDown } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

const sortOptions = [{ key: "created_at", label: "최신순" }];

type Props = {
  currentSort: string;
  onSortChange: (key: string) => void;
};

const SortChatRooms = ({ currentSort, onSortChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-14 flex justify-end">
      <button onClick={() => setIsOpen(!isOpen)} className="flex h-8 items-center gap-3 font-medium leading-8">
        {sortOptions.find((option) => option.key === currentSort)?.label || "정렬 기준"}
        <CaretDown
          weight="fill"
          className={clsx({
            "rotate-180": isOpen,
            "rotate-0": !isOpen
          })}
        />
      </button>

      <ul
        className={clsx(
          "absolute right-0 top-full z-20 min-w-[8rem] overflow-hidden rounded-2xl bg-bg-01 px-6 py-4 shadow-md transition duration-200",
          {
            "opacity-100": isOpen,
            "opacity-0": !isOpen
          }
        )}
        style={{
          transformOrigin: "top right"
        }}
      >
        {sortOptions.map((option) => (
          <li
            key={option.key}
            className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default"
          >
            <button
              onClick={() => {
                onSortChange(option.key);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>

      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default SortChatRooms;
