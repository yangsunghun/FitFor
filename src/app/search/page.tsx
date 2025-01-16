"use client";

import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import Pagination from "./_components/Pagination";
import SearchResults from "./_components/SearchResults";
import SortPosts from "./_components/SortPosts";
import TagFilters from "./_components/TagFilters";

const SearchPage = () => {
  const { query, page, tags, sort, handleSort } = useSearchQuery();
  const { Results, isPending, isError } = useSearchPosts(query, page, tags, sort);

  return (
    <div className="inner pb-40">
      <TagFilters />
      <SortPosts sort={sort} handleSort={handleSort} />
      <SearchResults Results={Results} isPending={isPending} isError={isError} />
      <Pagination Results={Results} />
    </div>
  );
};

export default SearchPage;
