"use client";
import React, { useState } from "react";
import sampleImage from "../../assets/images/image_sample.png";
import Image from "next/image";
import Masonry from "react-layout-masonry";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mock_data } from "./mock_data";

// const fetchItems = async ({ pageParam = 1 }) => {
//   const response = await fetch(`/api/items?page=${pageParam}`);
//   if (!response.ok) throw new Error("Network response was not ok");
//   return response.json();
// };

const fetchMockData = async ({ pageParam = 1 }) => {
  const perPage = 8;
  const start = (pageParam - 1) * perPage;
  const end = start + perPage;
  const items = mock_data.slice(start, end);
  const hasNextPage = end < mock_data.length;

  return {
    items,
    nextPage: hasNextPage ? pageParam + 1 : undefined
  };
};

const MainPage = () => {
  const [isMasonry, setIsMasonry] = useState(false);

  const toggleLayout = () => {
    setIsMasonry((prev) => !prev);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["mockItems"],
    queryFn: fetchMockData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false
  });

  const items = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="mx-auto w-full max-w-[1200px]">
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
          className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-all duration-300 ${isMasonry ? "bg-blue-500" : "bg-gray-300"}`}
        >
          <div
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${isMasonry ? "translate-x-6" : "translate-x-1"}`}
          ></div>
        </div>

        {isMasonry ? (
          <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={16} className="flex">
            {items.map((item, index) => (
              <div key={index} className="masonry-item">
                <figure className="relative w-full">
                  <Image src={item.image || sampleImage} alt={item.title} width={500} height={500} />
                </figure>
                <div>
                  <p>{item.title}</p>
                  <p>
                    <span>조회수: {item.viewCount}</span> <span>{item.createdAt}</span>
                  </p>
                  <p>{item.tags.join(", ")}</p>
                  <div>
                    <button>좋아요 {item.likes}</button>
                    <button>댓글 {item.comments}</button>
                    <button>북마크 {item.bookmarks}</button>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        ) : (
          <ul className="flex flex-wrap gap-5">
            {items.map((item, index) => (
              <li key={index} className="flex w-[48%] items-center gap-10">
                <figure className="relative h-[150px] w-[150px] overflow-hidden bg-gray-200">
                  <Image
                    src={item.image || sampleImage}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
                <div>
                  <p>{item.title}</p>
                  <p>
                    <span>조회수: {item.viewCount}</span> <span>{item.createdAt}</span>
                  </p>
                  <p>{item.tags.join(", ")}</p>
                  <div>
                    <button>좋아요 {item.likes}</button>
                    <button>댓글 {item.comments}</button>
                    <button>북마크 {item.bookmarks}</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 더보기 버튼 */}
        <div className="my-5 text-center">
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-lg border border-gray-300 px-4 py-2"
            >
              {isFetchingNextPage ? "불러오는 중..." : "더보기"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
