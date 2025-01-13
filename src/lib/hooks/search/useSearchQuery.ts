"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const tagsFromUrl = searchParams.get("category") ? JSON.parse(searchParams.get("category") || "[]") : [];

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [tags, setTags] = useState<string[]>(tagsFromUrl || []);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
    if (inputValue !== queryFromUrl) setInputValue(queryFromUrl);
  }, [queryFromUrl, pageFromUrl, tagsFromUrl]);

  //replace 가 더 적절한지 고민
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== query || page !== 1 || tags.length > 0) {
      router.push(
        `?query=${encodeURIComponent(inputValue)}&page=1&category=${encodeURIComponent(JSON.stringify(tags))}`
      );
    }
  };

  const toggleTag = (tag: string) => {
    const updatedTags = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
    if (JSON.stringify(updatedTags) !== JSON.stringify(tags)) {
      setTags(updatedTags);
      router.push(
        `?query=${encodeURIComponent(query)}&page=1&category=${encodeURIComponent(JSON.stringify(updatedTags))}`
      );
    }
  };

  return {
    inputValue,
    setInputValue,
    query,
    page,
    tags,
    handleSearch,
    toggleTag
  };
};
