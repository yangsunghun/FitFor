"use client";
import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SlideOver from "@/components/ui/SlideOver";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { CaretLeft, SlidersHorizontal, X } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchResults from "./SearchResults";
import SortPosts from "./SortPosts";
import TagCheckFilters from "./TagCheckFilters";
import TagFilters from "./TagFilters";

const SearchContents = () => {
  const { selectedCategory, isHydrated } = useCategoryStore();
  const [readyToRender, setReadyToRender] = useState(false);
  const { query, page, tags, sort, handleSort, handleToggleTag, resetTags } = useSearchQuery();

  const { Results, isPending, isError } = useSearchPosts(query, page, Object.values(tags).flat(), sort);
  const [isOpen, setIsOpen] = useState(false);

  const selectedTags = Object.entries(tags).flatMap(([groupKey, groupTags]) =>
    groupTags.map((tag) => ({ groupKey, tag }))
  );

  useEffect(() => {
    if (isHydrated) {
      setReadyToRender(true);
    }
  }, [isHydrated]);

  if (!readyToRender) {
    return <LoadingSpinner />;
  }

  if (isError) return <ErrorScreen error={new Error("검색 데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <Link href="/home">
        <CaretLeft className="absolute left-0 top-[40px]" size={20} weight="bold" />
      </Link>
      <section>
        <TagFilters selectedGroup={selectedCategory} tags={tags} handleToggleTag={handleToggleTag} />
        {selectedTags.length > 0 && (
          <div className="absolute left-[35px] top-[82px] z-10 hidden flex-wrap gap-3 text-caption text-text-03 mb:flex">
            {selectedTags.map(({ groupKey, tag }) => (
              <div key={tag} className="flex items-center gap-1">
                <span>{tag}</span>
                <button onClick={() => handleToggleTag(groupKey, tag)}>
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="relative mb-10 flex items-center justify-end mb:mb-0 mb:h-[48px] mb:justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className={clsx("hidden h-[24px] w-[24px] items-center justify-center mb:flex", {
            "text-text-03": selectedTags.length === 0,
            "text-primary-default": selectedTags.length > 0
          })}
        >
          <SlidersHorizontal size={16} weight="fill" />
        </button>
        <SortPosts sort={sort} handleSort={handleSort} />
      </div>

      <section>
        <SearchResults Results={Results} isPending={isPending} />
      </section>
      <Pagination Results={Results} />

      {isOpen && (
        <SlideOver title="필터" onClose={() => setIsOpen(false)}>
          <TagCheckFilters
            selectedGroup={selectedCategory}
            tags={tags}
            handleToggleTag={handleToggleTag}
            resetTags={resetTags}
          />
        </SlideOver>
      )}
    </>
  );
};

export default SearchContents;
