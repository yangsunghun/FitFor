import type { FetchPostsResponse } from "@/lib/types/post";
import { fetchPosts } from "@/lib/utils/post/fetchPost";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useState } from "react";

export const usePosts = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetchingNextPage
  } = useInfiniteQuery<FetchPostsResponse, Error, InfiniteData<FetchPostsResponse>, [string], number>({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await fetchPosts({ pageParam });
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined)
  });

  const allPosts = posts?.pages.flatMap((page) => page.items) || [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((post) => selectedTags.some((tag) => post.tags?.includes(tag)))
      : allPosts;

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  return {
    posts: filteredPosts,
    selectedTags,
    toggleTag,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    isError
  };
};
