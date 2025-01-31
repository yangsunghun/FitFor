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

  const tagsFromUrl = useMemo(() => {
    const category = searchParams.get("category");
    return category ? JSON.parse(decodeURIComponent(category || "[]")) : { gender: [], season: [], style: [], tpo: [] };
  }, [searchParams]);

  const sortFromUrl = searchParams.get("sort") || "created_at";

  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [tags, setTags] = useState<{ [key: string]: string[] }>(tagsFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  const memoizedTags = useMemo(() => tags, [tags]);

  // URL 변경 시 상태 동기화
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);

    // 기존 태그와 다를 때만 업데이트
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) {
      setTags(tagsFromUrl);
    }
  }, [queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

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

    setSelectedCategory(null);
  };

  // 태그 토글
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

        router.replace(
          `/search?query=${encodeURIComponent(query)}&page=1&category=${encodeTagsForUrl(
            updatedTags
          )}&sort=${encodeURIComponent(sort)}`
        );

        return updatedTags;
      });
    },
    [query, sort, router]
  );

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
