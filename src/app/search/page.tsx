"use client";

import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import Pagination from "./_components/Pagination";
import SearchResults from "./_components/SearchResults";

const SearchPage = () => {
  const { query, page } = useSearchQuery();
  const { data: Results, isPending, error } = useSearchPosts(query, page);

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <SearchResults Results={Results} isPending={isPending} error={error} />
      <Pagination Results={Results} />
    </div>
  );
};

export default SearchPage;
