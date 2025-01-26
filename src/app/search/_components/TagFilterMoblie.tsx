import MoblieHeader from "@/components/layout/MoblieHeader";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { SlidersHorizontal, X } from "@phosphor-icons/react";
import clsx from "clsx";

type TagFiltersProps = {
  selectedGroup: string | null;
  selectedTags: { groupKey: string; tag: string }[];
  handleToggleTag: (groupKey: string, tag: string) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const TagFilterMoblie = ({ selectedGroup, selectedTags, handleToggleTag, setIsOpen }: TagFiltersProps) => {
  return (
    <>
      {TAG_GROUPS.filter((group) => !selectedGroup || group.key === selectedGroup).map((group) => (
        <MoblieHeader key={group.key} pageName={group.title} action="back" />
      ))}
      <div className="flex h-[48px] w-full items-start justify-between">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(({ groupKey, tag }) => (
              <div
                key={tag}
                className="flex items-center gap-1 rounded-[4px] border border-line-02 px-[8px] py-[4px] text-caption text-text-03"
              >
                <span>{tag}</span>
                <button onClick={() => handleToggleTag(groupKey, tag)}>
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className={clsx("flex h-[28px] w-[28px] items-center justify-center rounded-[6px]", {
            "border border-line-02 text-text-03": selectedTags.length === 0,
            "border-none bg-primary-default text-text-01": selectedTags.length > 0
          })}
        >
          <SlidersHorizontal size={20} weight="fill" />
        </button>
      </div>
    </>
  );
};

export default TagFilterMoblie;
