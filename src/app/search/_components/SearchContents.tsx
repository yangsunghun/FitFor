"use client";
import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SlideOver from "@/components/ui/SlideOver";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchResults from "./SearchResults";
import SortPosts from "./SortPosts";
import TagCheckFilters from "./TagCheckFilters";
import TagFilters from "./TagFilters";

const SearchContents = () => {
  const { selectedCategory, isHydrated } = useCategoryStore();
  const [readyToRender, setReadyToRender] = useState(false);
  const { query, page, tags, sort, handleSort } = useSearchQuery();
  const { Results, isPending, isError } = useSearchPosts(query, page, Object.values(tags).flat(), sort);
  const [isOpen, setIsOpen] = useState(false);

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
      <section>
        <TagFilters selectedGroup={selectedCategory} />
      </section>

      <div className="relative mb-10 flex items-center justify-end mb:mb-0 mb:h-[48px] mb:justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="hidden h-[24px] w-[24px] items-center justify-center text-text-03 mb:flex"
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
          <TagCheckFilters selectedGroup={selectedCategory} />
        </SlideOver>
      )}
    </>
  );
};

export default SearchContents;
