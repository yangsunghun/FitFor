"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const tagsFromUrl = searchParams.get("category") ? JSON.parse(searchParams.get("category") || "[]") : [];
  const sortFromUrl = searchParams.get("sort") || "created_at";

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [tags, setTags] = useState<string[]>(tagsFromUrl || []);
  const [sort, setSort] = useState(sortFromUrl);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);
  }, [queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

  // 검색 실행
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== query || page !== 1 || tags.length > 0 || sort !== sortFromUrl) {
      router.push(
        `?query=${encodeURIComponent(inputValue)}&page=1&category=${encodeURIComponent(
          JSON.stringify(tags)
        )}&sort=${encodeURIComponent(sort)}`
      );
    }
  };

  // 태그 토글
  const handleToggleTag = (tag: string) => {
    const updatedTags = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
    if (JSON.stringify(updatedTags) !== JSON.stringify(tags)) {
      setTags(updatedTags);
      router.push(
        `?query=${encodeURIComponent(query)}&page=1&category=${encodeURIComponent(
          JSON.stringify(updatedTags)
        )}&sort=${encodeURIComponent(sort)}`
      );
    }
  };

  // 정렬 변경
  const handleSort = (newSort: string) => {
    if (newSort !== sort) {
      setSort(newSort);
      router.push(
        `?query=${encodeURIComponent(query)}&page=1&category=${encodeURIComponent(
          JSON.stringify(tags)
        )}&sort=${encodeURIComponent(newSort)}`
      );
    }
  };

  return {
    inputValue,
    setInputValue,
    query,
    page,
    tags,
    sort,
    handleSearch,
    handleToggleTag,
    handleSort
  };
};
