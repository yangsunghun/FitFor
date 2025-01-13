"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    setQuery(queryFromUrl);
    setPage(pageFromUrl);
    setInputValue(queryFromUrl);
  }, [queryFromUrl, pageFromUrl]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(inputValue);
    router.push(`/search?query=${encodeURIComponent(inputValue)}&page=1`); //replace 가 더 적절한지 고민
  };

  return {
    inputValue,
    setInputValue,
    query,
    page,
    handleSearch
  };
};
