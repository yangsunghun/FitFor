"use client";

import type { FetchPostsResponse } from "@/lib/types/post";
import { fetchPosts } from "@/lib/utils/post/fetchPost";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { useState } from "react";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

const ListLender: React.FC = () => {
  const [isMasonry, setIsMasonry] = useState(false);

  const toggleLayout = () => {
    setIsMasonry((prev) => !prev);
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

  const posts = data?.pages?.flatMap((page) => page.items) || [];

  if (isPending) return <p>로딩</p>;
  if (isError) return <p>오류</p>;

  return (
    <>
      <section>
        <ul className="my-10 flex gap-2">
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류1</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류2</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류3</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류4</button>
          </li>
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

        {isMasonry ? <MasonryLayout posts={posts} /> : <ListLayout posts={posts} />}

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
