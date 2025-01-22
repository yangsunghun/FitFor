"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const tagsFromUrl = searchParams.get("category")
    ? JSON.parse(decodeURIComponent(searchParams.get("category") || "[]"))
    : { gender: [], season: [], style: [], tpo: [] };
  const sortFromUrl = searchParams.get("sort") || "created_at";

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [tags, setTags] = useState<{ [key: string]: string[] }>(tagsFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);
  }, [query, page, tags, sort, queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

  // JSON을 URL-safe한 배열 표현으로 변환하는 헬퍼 함수
  const encodeTagsForUrl = (tags: { [key: string]: string[] }): string => {
    // JSON.stringify로 직렬화된 값을 반환 (추가 인코딩 제거)
    return JSON.stringify(tags);
  };

  // 검색 실행
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== query || page !== 1 || Object.values(tags).flat().length > 0 || sort !== sortFromUrl) {
      router.replace(
        `/search?query=${encodeURIComponent(inputValue)}&page=1&category=${encodeTagsForUrl(
          tags
        )}&sort=${encodeURIComponent(sort)}`
      );
    }
  };

  // 태그 토글
  const handleToggleTag = (key: string, tag: string) => {
    const updatedTags = { ...tags };

    // 키에 해당하는 배열이 없는 경우 빈 배열로 초기화
    if (!Array.isArray(updatedTags[key])) {
      updatedTags[key] = [];
    }

    if (updatedTags[key].includes(tag)) {
      // 이미 선택된 태그라면 제거
      updatedTags[key] = updatedTags[key].filter((t) => t !== tag);
    } else {
      // 새 태그를 추가하려고 할 때 최대 2개로 제한
      if (updatedTags[key].length >= 4) {
        alert("태그는 최대 2개까지만 선택할 수 있습니다.");
        return;
      }
      updatedTags[key] = [...updatedTags[key], tag];
    }

    setTags(updatedTags);

    // URL 동기화
    router.replace(
      `/search?query=${encodeURIComponent(query)}&page=1&category=${encodeTagsForUrl(
        updatedTags
      )}&sort=${encodeURIComponent(sort)}`
    );
  };

  // 태그 초기화
  const resetTags = () => {
    const emptyTags = { gender: [], season: [], style: [], tpo: [] };
    setTags(emptyTags);

    // URL 동기화
    router.replace(
      `/search?query=${encodeURIComponent(query)}&page=1&category=${encodeTagsForUrl(
        emptyTags
      )}&sort=${encodeURIComponent(sort)}`
    );
  };

  // 정렬 변경
  const handleSort = (newSort: string) => {
    if (newSort !== sort) {
      setSort(newSort);
      router.replace(
        `/search?query=${encodeURIComponent(query)}&page=1&category=${encodeTagsForUrl(
          tags
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
    resetTags,
    handleSort,
    encodeTagsForUrl
  };
};
