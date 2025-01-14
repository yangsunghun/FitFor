"use client"

import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

type ContentGridProps = {
  title: string;
  subtitle: string;
  posts: PostType[];
  hasNextPage: boolean | undefined; // 초기에 undefined
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const ContentList = ({ title, subtitle, posts, hasNextPage, isFetchingNextPage, fetchNextPage }: ContentGridProps) => {
  console.log("content list 다음 페이지 존재", hasNextPage)

  return (
    <section className="my-12">
      <div className="mb-4">
        <p className="text-body text-gray-600">{subtitle}</p>
        <h2 className="text-title1 font-bold">{title}</h2>
      </div>
      <div className="flex flex-row gap-8 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2">
        {posts ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square h-[216px] w-[180px] flex-shrink-0 content-center justify-items-center overflow-hidden rounded-lg bg-gray-100"
            >
              <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
              <figure className="relative h-full w-full overflow-hidden bg-gray-200">
                <Image
                  src={post.thumbnail || sampleImage}
                  alt={post.title}
                  height={216}
                  width={180}
                  className="object-cover"
                />
              </figure>
            </div>
          ))
        ) : (
          <p>포스트가 없습니다.</p>
        )}
        {hasNextPage && (
          <button
            onClick={fetchNextPage}
            className="relative aspect-square h-[216px] w-[180px] content-center justify-items-center rounded-lg bg-gray-100"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "로딩 중..." : "더보기"}
          </button>
        )}
      </div>
    </section>
  );
};

export default ContentList;
