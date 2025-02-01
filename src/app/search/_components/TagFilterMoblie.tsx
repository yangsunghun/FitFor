import MobileHeader from "@/components/layout/MoblieHeader";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { SlidersHorizontal, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { memo } from "react";

type TagFiltersProps = {
  selectedGroup: string | null;
  selectedTags: { groupKey: string; tag: string }[];
  handleToggleTag: (groupKey: string, tag: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  query: string;
};

const TagFilterMoblie = memo(({ selectedGroup, selectedTags, handleToggleTag, setIsOpen, query }: TagFiltersProps) => {
  return (
    <>
      {selectedGroup ? (
        TAG_GROUPS.filter((group) => !selectedGroup || group.key === selectedGroup).map((group) => (
          <MobileHeader key={group.key} pageName={group.title} action="navigate" path="/home" />
        ))
      ) : (
        <MobileHeader pageName={`"${query}" 검색결과`} action="navigate" path="/home" />
      )}
      <div className="flex min-h-[48px] w-full items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {selectedTags.length > 0 &&
            selectedTags.map(({ groupKey, tag }) => (
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
});

TagFilterMoblie.displayName = "TagFilterMoblie";

export default TagFilterMoblie;
