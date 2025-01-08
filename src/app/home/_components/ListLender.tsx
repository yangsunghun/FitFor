"use client";

import type { Post } from "@/lib/types/post";
import { fetchPosts } from "@/lib/utils/post/fetchPost";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

// fetchPosts 반환 타입
interface FetchPostsResponse {
  items: Post[];
  nextPage?: number;
}

const ListLender: React.FC = () => {
  const [isMasonry, setIsMasonry] = useState(false);

  const toggleLayout = () => {
    setIsMasonry((prev) => !prev);
  };

  // useInfiniteQuery에 정확한 제네릭 타입 적용
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    FetchPostsResponse, // queryFn의 반환 타입
    Error, // 에러 타입
    InfiniteData<FetchPostsResponse> // InfiniteQuery의 데이터 타입
  >({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false
  });

  // 안전하게 데이터 추출
  const posts = data?.pages?.flatMap((page) => page.items) || [];

  return (
    <section>
      {/* 레이아웃 토글 버튼 */}
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

      {/* 데이터 전달 */}
      {isMasonry ? <MasonryLayout posts={posts} /> : <ListLayout posts={posts} />}

      {/* 더보기 버튼 */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 rounded-lg border border-gray-300 px-4 py-2"
        >
          {isFetchingNextPage ? "불러오는 중..." : "더보기"}
        </button>
      )}
    </section>
  );
};

export default ListLender;
