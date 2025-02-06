"use client";

import { toast } from "@/lib/utils/common/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const useChatRoomQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tagsFromUrl = useMemo(() => {
    return searchParams.get("category")
      ? JSON.parse(decodeURIComponent(searchParams.get("category") || "[]"))
      : { gender: [], season: [], style: [], tpo: [] };
  }, [searchParams]);

  const sortFromUrl = searchParams.get("sort") || "created_at";

  const [tags, setTags] = useState<{ [key: string]: string[] }>(tagsFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(tagsFromUrl)) setTags(tagsFromUrl);
    if (sort !== sortFromUrl) setSort(sortFromUrl);
  }, [tagsFromUrl, sortFromUrl]);

  const encodeTagsForUrl = (tags: { [key: string]: string[] }): string => {
    return JSON.stringify(tags);
  };

  const handleToggleTag = (key: string, tag: string) => {
    const updatedTags = { ...tags };

    if (!Array.isArray(updatedTags[key])) {
      updatedTags[key] = [];
    }

    if (updatedTags[key].includes(tag)) {
      updatedTags[key] = updatedTags[key].filter((t) => t !== tag);
    } else {
      if (updatedTags[key].length >= 1) {
        toast("태그는 최대 1개까지만 선택할 수 있습니다.", "warning");
        return;
      }
      updatedTags[key] = [...updatedTags[key], tag];
    }

    setTags(updatedTags);

    router.replace(`/chat?category=${encodeTagsForUrl(updatedTags)}&sort=${encodeURIComponent(sort)}`);
  };

  const resetTags = () => {
    const emptyTags = { gender: [], season: [], style: [], tpo: [] };
    setTags(emptyTags);

    router.replace(`/chat?category=${encodeTagsForUrl(emptyTags)}&sort=${encodeURIComponent(sort)}`);
  };

  const handleSort = (newSort: string) => {
    if (newSort !== sort) {
      setSort(newSort);
      router.replace(`/chat?category=${encodeTagsForUrl(tags)}&sort=${encodeURIComponent(newSort)}`);
    }
  };

  return {
    tags,
    sort,
    handleToggleTag,
    resetTags,
    handleSort,
    encodeTagsForUrl
  };
};
