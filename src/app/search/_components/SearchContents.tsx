"use client";
import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchResults from "./SearchResults";
import SortPosts from "./SortPosts";
import TagFilters from "./TagFilters";

const SearchContents = () => {
  const { selectedCategory, isHydrated } = useCategoryStore();
  const [readyToRender, setReadyToRender] = useState(false);
  const { query, page, tags, sort, handleSort } = useSearchQuery();
  const { Results, isPending, isError } = useSearchPosts(query, page, Object.values(tags).flat(), sort);

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
      <SortPosts sort={sort} handleSort={handleSort} />
      <section className="mt-10">
        <SearchResults Results={Results} isPending={isPending} />
      </section>
      <Pagination Results={Results} />
    </>
  );
};

export default SearchContents;
