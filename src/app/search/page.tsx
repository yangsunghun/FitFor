"use client";

import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import Pagination from "./_components/Pagination";
import SearchResults from "./_components/SearchResults";
import SortPosts from "./_components/SortPosts";
import TagFilters from "./_components/TagFilters";

const SearchPage = () => {
  const { query, page, tags, sort, handleSort } = useSearchQuery();
  const { data: Results, isPending, error } = useSearchPosts(query, page, tags, sort);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <TagFilters />
      <SortPosts sort={sort} handleSort={handleSort} />
      <SearchResults Results={Results} isPending={isPending} error={error} />
      <Pagination Results={Results} />
    </div>
  );
};

export default SearchPage;
