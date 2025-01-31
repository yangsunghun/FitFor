"use client";

import useCategoryStore from "@/lib/store/useCategoryStore";
import { toast } from "@/lib/utils/common/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const sortFromUrl = searchParams.get("sort") || "created_at";

  const tagsFromUrl = useMemo(() => {
    const category = searchParams.get("category");
    return category ? JSON.parse(decodeURIComponent(category)) : { gender: [], season: [], style: [], tpo: [] };
  }, [searchParams]);

  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [tags, setTags] = useState<{ [key: string]: string[] }>(tagsFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  const memoizedTags = useMemo(() => tags, [tags]);

  // URL 변경 시 기존 상태와 다를 때만 업데이트하여 리렌더링 방지
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
  }, [queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

  // router.replace 실행 전에 현재 URL과 비교하여 변경된 경우에만 실행
  const updateUrl = useCallback(
    (newQuery: string, newTags: typeof tags, newSort: string) => {
      const newUrl = `/search?query=${encodeURIComponent(newQuery)}&page=1&category=${encodeTagsForUrl(
        newTags
      )}&sort=${encodeURIComponent(newSort)}`;

      if (newUrl !== window.location.href) {
        setTimeout(() => {
          router.replace(newUrl);
        }, 0);
      }
    },
    [router]
  ); // 의존성에 router 추가

  // URL 변경은 별도의 `useEffect`에서 처리
  useEffect(() => {
    updateUrl(query, tags, sort); // 상태가 모두 업데이트된 후에만 실행됨
  }, [query, tags, sort, updateUrl]);

  const encodeTagsForUrl = (tags: { [key: string]: string[] }): string => JSON.stringify(tags);

  // 검색 실행
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUrl(inputValue, tags, sort);
    setSelectedCategory(null);
  };

  // 태그 토글 - 기존 태그와 비교하여 변경된 경우에만 `setTags()` 실행
  const handleToggleTag = useCallback(
    (key: string, tag: string) => {
      setTags((prevTags) => {
        const currentTags = prevTags[key] || [];
        let updatedTags;

        if (currentTags.includes(tag)) {
          updatedTags = { ...prevTags, [key]: currentTags.filter((t) => t !== tag) };
        } else {
          if (currentTags.length >= 4) {
            toast("태그는 최대 4개까지만 선택할 수 있습니다.", "warning");
            return prevTags;
          }
          updatedTags = { ...prevTags, [key]: [...currentTags, tag] };
        }

        updateUrl(query, updatedTags, sort);
        return updatedTags;
      });
    },
    [query, sort, updateUrl]
  );

  // 태그 초기화
  const resetTags = useCallback(() => {
    const emptyTags = { gender: [], season: [], style: [], tpo: [] };
    setTags(emptyTags);
    updateUrl(query, emptyTags, sort);
  }, [query, sort, updateUrl]);

  // 정렬 변경 - 기존 값과 다를 때만 실행
  const handleSort = useCallback(
    (newSort: string) => {
      if (newSort !== sort) {
        setSort(newSort);
        updateUrl(query, tags, newSort);
      }
    },
    [query, tags, sort, updateUrl]
  );

  return {
    inputValue,
    query,
    page,
    tags: memoizedTags,
    sort,
    setInputValue,
    setTags,
    setQuery,
    handleSearch,
    handleToggleTag,
    resetTags,
    handleSort,
    encodeTagsForUrl
  };
};
