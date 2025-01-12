"use client";

import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "./_components/Pagination";
import SearchForm from "./_components/SearchForm";
import SearchResults from "./_components/SearchResults";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);

  const { data, isLoading, error } = useSearchPosts(query, page);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    setQuery(queryFromUrl);
    setPage(pageFromUrl);
    setInputValue(queryFromUrl); // URL에서 가져온 값을 input에 반영
  }, [queryFromUrl, pageFromUrl]);

  // 검색 제출 핸들러
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(inputValue); // 검색 실행
    router.push(`?query=${encodeURIComponent(inputValue)}&page=1`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    router.push(`?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <SearchForm inputValue={inputValue} setInputValue={setInputValue} onSearch={handleSearch} />
      <SearchResults data={data} isLoading={isLoading} error={error} />
      <Pagination data={data} page={page} onPageChange={handlePageChange} />
    </div>
  );
};

export default SearchPage;
