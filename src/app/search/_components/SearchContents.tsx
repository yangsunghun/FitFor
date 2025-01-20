"use client";
import ErrorScreen from "@/components/common/ErrorScreen";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import Pagination from "./Pagination";
import SearchResults from "./SearchResults";
import SortPosts from "./SortPosts";
import TagFilters from "./TagFilters";

const SearchContents = () => {
  const { query, page, tags, sort, handleSort } = useSearchQuery();
  const { Results, isPending, isError } = useSearchPosts(query, page, Object.values(tags).flat(), sort);

  if (isError) return <ErrorScreen error={new Error("검색 데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <section>
        <TagFilters />
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
