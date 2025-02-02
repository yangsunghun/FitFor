"use client";
import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SlideOver from "@/components/ui/SlideOver";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchResults from "./SearchResults";
import SortPosts from "./SortPosts";
import TagCheckFilters from "./TagCheckFilters";
import TagFilterMoblie from "./TagFilterMoblie";
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
      <section>
        <MinTablet>
          <TagFilters selectedGroup={selectedCategory} tags={tags} handleToggleTag={handleToggleTag} />
        </MinTablet>
        <Tablet>
          <TagFilterMoblie
            selectedGroup={selectedCategory}
            selectedTags={selectedTags}
            handleToggleTag={handleToggleTag}
            setIsOpen={setIsOpen}
            query={query}
          />
        </Tablet>
      </section>

      <div className="relative mb-10 flex items-center justify-between tb:mb-0 tb:h-[48px]">
        <p>
          총 <b>{Results?.total}</b>개
        </p>
        <SortPosts sort={sort} handleSort={handleSort} />
      </div>

      <section>
        <SearchResults Results={Results} isPending={isPending} />
      </section>
      <Pagination Results={Results} />

      <Tablet>
        {isOpen && (
          <SlideOver title="필터" article="최대 4개까지 선택 가능해요" onClose={() => setIsOpen(false)}>
            <TagCheckFilters
              selectedGroup={selectedCategory}
              tags={tags}
              handleToggleTag={handleToggleTag}
              resetTags={resetTags}
              onClose={() => setIsOpen(false)}
            />
          </SlideOver>
        )}
      </Tablet>
    </>
  );
};

export default SearchContents;
