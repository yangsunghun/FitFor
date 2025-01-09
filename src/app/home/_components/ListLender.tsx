"use client";

import { fetchPosts } from "@/lib/api/post/fetchPost";
import { useLayoutStore } from "@/lib/store/uselayoutStore";
import type { FetchPostsResponse } from "@/lib/types/post";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useState } from "react";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

const ListLender: React.FC = () => {
  const { isMasonry, toggleLayout } = useLayoutStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 태그 필터링
  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  const { data, fetchNextPage, hasNextPage, isPending, isError, isFetchingNextPage } = useInfiniteQuery<
    FetchPostsResponse,
    Error,
    InfiniteData<FetchPostsResponse>,
    [string],
    number
  >({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return await fetchPosts({ pageParam });
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined)
  });

  const allPosts = data?.pages?.flatMap((page) => page.items) || [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((post) => selectedTags.some((tag) => post.season_tag?.includes(tag)))
      : allPosts;

  if (isPending) return <p>로딩...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <section>
        <ul className="my-10 flex gap-2">
          {["봄", "여름", "가을", "겨울"].map((tag) => (
            <li key={tag}>
              <button
                onClick={() => handleTagClick(tag)}
                className={`rounded-full border px-[15px] ${
                  selectedTags.includes(tag) ? "bg-blue-500 text-white" : "border-gray-500"
                }`}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div
          onClick={toggleLayout}
          className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-all duration-300 ${
            isMasonry ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
              isMasonry ? "translate-x-6" : "translate-x-1"
            }`}
          ></div>
        </div>

        {isMasonry ? <MasonryLayout posts={filteredPosts} /> : <ListLayout posts={filteredPosts} />}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2"
          >
            {isFetchingNextPage ? "불러오는 중 로딩" : "더보기"}
          </button>
        )}
      </section>
    </>
  );
};

export default ListLender;
