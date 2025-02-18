import useCategoryStore from "@/lib/store/useCategoryStore";
import { toast } from "@/lib/utils/common/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  const isFirstRender = useRef(true);
  const isNavigatedFromHeader = useRef(false);

  const queryRef = useRef(query);
  const pageRef = useRef(page);
  const sortRef = useRef(sort);
  const tagsRef = useRef(tags);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    startTransition(() => {
      if (queryRef.current !== queryFromUrl) {
        setQuery(queryFromUrl);
        queryRef.current = queryFromUrl;
      }
      if (pageRef.current !== pageFromUrl) {
        setPage(pageFromUrl);
        pageRef.current = pageFromUrl;
      }
      if (sortRef.current !== sortFromUrl) {
        setSort(sortFromUrl);
        sortRef.current = sortFromUrl;
      }
      if (JSON.stringify(tagsRef.current) !== JSON.stringify(tagsFromUrl)) {
        setTags(tagsFromUrl);
        tagsRef.current = tagsFromUrl;
      }
    });
  }, [queryFromUrl, pageFromUrl, tagsFromUrl, sortFromUrl]);

  const updateUrl = useCallback(
    (newQuery: string, newTags: typeof tags, newSort: string) => {
      const newUrl = `/search?query=${encodeURIComponent(newQuery)}&page=1&category=${encodeTagsForUrl(
        newTags
      )}&sort=${encodeURIComponent(newSort)}`;

      if (newUrl !== window.location.pathname + window.location.search) {
        setTimeout(() => {
          router.replace(newUrl, { scroll: false });
        }, 0);
      }
    },
    [router]
  );

  useEffect(() => {
    if (pathname !== "/search") return;

    if (isNavigatedFromHeader.current) {
      updateUrl(query, tags, sort);
      isNavigatedFromHeader.current = false;
    }
  }, [pathname, query, tags, sort, updateUrl]);

  const encodeTagsForUrl = (tags: { [key: string]: string[] }): string => JSON.stringify(tags);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isNavigatedFromHeader.current = true;
    updateUrl(inputValue, tags, sort);
    setSelectedCategory(null);
  };

  const handleHeaderTagClick = (tag: string) => {
    isNavigatedFromHeader.current = true;
    router.push(`/search?query=${encodeURIComponent(tag)}&page=1&category=${encodeTagsForUrl(tags)}&sort=${sort}`);
  };

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      startTransition(() => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", String(newPage));

        router.push(`/search?${params.toString()}`, { scroll: false });
      });
    },
    [router]
  );

  const resetTags = useCallback(() => {
    const emptyTags = { gender: [], season: [], style: [], tpo: [] };
    setTags(emptyTags);
    updateUrl(query, emptyTags, sort);
  }, [query, sort, updateUrl]);

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
    encodeTagsForUrl,
    handlePageChange
  };
};
