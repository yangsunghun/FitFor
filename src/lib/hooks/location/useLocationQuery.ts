import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

export const useLocationQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get("query") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const sortFromUrl = searchParams.get("sort") || "created_at";

  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [sort, setSort] = useState(sortFromUrl);
  const [activeLocation, setActiveLocation] = useState<string | null>(queryFromUrl || null);

  useEffect(() => {
    startTransition(() => {
      setQuery(queryFromUrl);
      setPage(pageFromUrl);
      setSort(sortFromUrl);
      setActiveLocation(queryFromUrl || null);
    });
  }, [queryFromUrl, pageFromUrl, sortFromUrl]);

  const updateUrl = useCallback(
    (newQuery: string, newPage: number = 1, newSort: string = sort) => {
      const newUrl = `/search-location?query=${encodeURIComponent(newQuery)}&page=${newPage}&sort=${encodeURIComponent(newSort)}`;

      if (newUrl !== window.location.pathname + window.location.search) {
        router.replace(newUrl, { scroll: false });
      }
    },
    [router, sort]
  );

  const handleLocationSelect = (location: string) => {
    setActiveLocation(location);
    setQuery(location);
    updateUrl(location, 1, sort);
  };

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

  const handleSort = useCallback(
    (newSort: string) => {
      if (newSort !== sort) {
        setSort(newSort);
        updateUrl(query, 1, newSort);
      }
    },
    [query, sort, updateUrl]
  );

  return {
    query,
    page,
    sort,
    activeLocation,
    setQuery,
    setActiveLocation: handleLocationSelect,
    handleSort,
    handlePageChange
  };
};
