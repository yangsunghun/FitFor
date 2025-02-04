"use client";

import { TAG_GROUPS } from "@/lib/constants/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { X, SlidersHorizontal } from "@phosphor-icons/react";
import clsx from "clsx";

type RoomFiltersProps = {
  selectedGroup: string;
  selectedTags: { groupKey: string; tag: string }[];
  handleToggleTag: (groupKey: string, tag: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedGroup: (groupKey: string) => void;
};

const RoomFilterMobile = ({
  selectedGroup,
  selectedTags,
  handleToggleTag,
  setIsOpen,
  setSelectedGroup
}: RoomFiltersProps) => {
  return (
    <Tabs defaultValue={TAG_GROUPS[0].key} value={selectedGroup} onValueChange={setSelectedGroup} className="space-y-6">
      {/* Tabs List: 카테고리 탭 */}
      <TabsList className="flex h-full w-full justify-start rounded-none border-b bg-transparent p-0">
        {TAG_GROUPS.map((group) => (
          <TabsTrigger
            key={group.key}
            value={group.key}
            className="inline-flex h-full items-center justify-center whitespace-nowrap rounded-none border-b-2 border-transparent px-[15px] py-[12px] text-body font-medium !shadow-none !outline-none transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary-default data-[state=active]:bg-white data-[state=active]:text-primary-default data-[state=active]:shadow"
          >
            {group.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* 필터 설정과 태그 리스트 컨테이너 */}
      <div className="mt-4 flex items-center justify-between">
        {/* 선택된 태그 리스트 */}
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

        {/* 필터 설정 버튼 */}
        <button
          onClick={() => setIsOpen(true)}
          className={clsx("flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-[6px]", {
            "border border-line-02 text-text-03": selectedTags.length === 0,
            "border-none bg-primary-default text-text-01": selectedTags.length > 0
          })}
        >
          <SlidersHorizontal size={20} weight="fill" />
        </button>
      </div>
    </Tabs>
  );
};

export default RoomFilterMobile;
