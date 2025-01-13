"use client";

import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import Pagination from "./_components/Pagination";
import SearchResults from "./_components/SearchResults";
import TagFilters from "./_components/TagFilters";

const SearchPage = () => {
  const { query, page, tags } = useSearchQuery();
  const { data: Results, isPending, error } = useSearchPosts(query, page, tags);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <TagFilters />
      <SearchResults Results={Results} isPending={isPending} error={error} />
      <Pagination Results={Results} />
    </div>
  );
};

export default SearchPage;
