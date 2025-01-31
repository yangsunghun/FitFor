"use client";

import useCategoryStore from "@/lib/store/useCategoryStore";
import { toast } from "@/lib/utils/common/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
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

  // `useRef`를 사용해 첫 실행 여부 체크 (최초 `updateUrl` 실행 방지)
  const isFirstRender = useRef(true);
  const isNavigatedFromHeader = useRef(false); // 헤더에서 검색 페이지로 이동했는지 체크

  // URL 변경 시 기존 상태와 다를 때만 업데이트하여 리렌더링 방지
  useEffect(() => {
    if (query !== queryFromUrl) setQuery(queryFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
  }, [queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

  // `router.replace()` 실행 전에 현재 URL과 비교하여 필요할 때만 실행
  const updateUrl = useCallback(
    (newQuery: string, newTags: typeof tags, newSort: string) => {
      const newUrl = `/search?query=${encodeURIComponent(newQuery)}&page=1&category=${encodeTagsForUrl(
        newTags
      )}&sort=${encodeURIComponent(newSort)}`;

      if (newUrl !== window.location.pathname + window.location.search) {
        setTimeout(() => {
          router.replace(newUrl);
        }, 0);
      }
    },
    [router]
  );

  // `/search` 페이지 진입 시, 헤더에서 클릭한 경우에만 `updateUrl` 실행
  useEffect(() => {
    if (pathname !== "/search") return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 최초 마운트 시 실행 방지
    }

    if (isNavigatedFromHeader.current) {
      updateUrl(query, tags, sort); // 헤더에서 클릭한 경우에만 실행
      isNavigatedFromHeader.current = false; // 초기화
    }
  }, [pathname, query, tags, sort, updateUrl]);

  const encodeTagsForUrl = (tags: { [key: string]: string[] }): string => JSON.stringify(tags);

  // 검색 실행 (헤더에서 이동 시, `isNavigatedFromHeader`를 `true`로 설정)
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isNavigatedFromHeader.current = true;
    updateUrl(inputValue, tags, sort);
    setSelectedCategory(null);
  };

  // 헤더에서 태그 클릭 시 호출하는 함수 (검색 페이지로 이동 전 `isNavigatedFromHeader` 설정)
  const handleHeaderTagClick = (tag: string) => {
    isNavigatedFromHeader.current = true;
    router.push(`/search?query=${encodeURIComponent(tag)}&page=1&category=${encodeTagsForUrl(tags)}&sort=${sort}`);
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

  // 정렬 변경
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
    handleHeaderTagClick,
    handleToggleTag,
    resetTags,
    handleSort,
    encodeTagsForUrl
  };
};
