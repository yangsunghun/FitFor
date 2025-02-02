"use client";
import { REGIONS_WITH_QUERY, TAG_GROUPS } from "@/lib/constants/constants";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import type { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Tags } from "../ui/Tags";

type Tags = { [key: string]: string[] };
type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderCategorys = ({ setIsOpen }: Props) => {
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const { handleToggleTag, setTags, setQuery } = useSearchQuery();
  const { setActiveLocation } = useLocationQuery();
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const { activeTab, handleTabChange } = useActiveTabs();

  const handleCategoryClick = (key: string, tag: string) => {
    setQuery("");
    setTags({ gender: [], season: [], style: [], tpo: [] });

    handleToggleTag(key, tag);
    setSelectedCategory(key);
  };

  const mobileUI = (
    <>
      <Tabs
        defaultValue={TAG_GROUPS[0].key}
        value={activeTab}
        onValueChange={handleTabChange}
        className="h-[48px] w-full"
      >
        <TabsList className="h-full w-full justify-start rounded-none border-b border-line-02 bg-transparent p-0">
          {TAG_GROUPS.map((group, index) => (
            <TabsTrigger
              key={group.key}
              value={`tab-${index}`}
              className="h-full rounded-none border-b-2 border-transparent px-[15px] py-[12px] text-body font-medium !shadow-none data-[state=active]:border-primary-default data-[state=active]:text-primary-default"
            >
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="inner py-[16px]">
          <p className="text-title2 font-bold">카테고리별 키워드</p>
          <p className="mt-[4px] text-body text-text-03">검색이 어렵거나 생각이 나지 않을 때 이용해보세요!</p>
        </div>
        {TAG_GROUPS.map((group, index) => (
          <TabsContent key={group.key} value={`tab-${index}`}>
            <ul className="inner mr-6 flex flex-wrap gap-[8px]">
              {group.tags.map((tag) => (
                <li
                  key={tag}
                  onClick={() => {
                    handleCategoryClick(group.key, tag);
                    setIsOpen(false);
                  }}
                  className="font-medium text-text-03 transition-colors duration-200"
                >
                  <button onClick={() => handleCategoryClick(group.key, tag)}>
                    <Tags label={tag} variant="grayLine" size="lg" />
                  </button>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );

  const desktopUI = (
    <>
      {TAG_GROUPS.map((group) => (
        <div key={group.key} className="text-title2">
          <p className="mb-8 font-bold">{group.title}</p>

          <ul className="mr-6 flex h-[32rem] flex-col flex-wrap border-r border-line-02">
            {group.tags.map((tag) => (
              <li key={tag} className="mb-6 w-[8.75rem]">
                <button
                  onClick={() => {
                    handleCategoryClick(group.key, tag);
                    setIsOpen(false);
                  }}
                  className="font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="text-title2">
        <p className="mb-8 font-bold">지역</p>

        <ul className="flex h-[32rem] flex-col flex-wrap">
          {REGIONS_WITH_QUERY.map((tag) => (
            <li
              key={tag.title}
              className="mb-6 w-[6.875rem] font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
            >
              <button
                onClick={() => {
                  setActiveLocation(tag.query);
                  setIsOpen(false);
                }}
              >
                {tag.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return isTabletOrSmaller ? mobileUI : desktopUI;
};

export default HeaderCategorys;
