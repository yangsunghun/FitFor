"use client";

import { Button } from "@/components/ui/Button";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import Link from "next/link";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";
import TagsFilter from "./TagsFilter";

type ListLenderProps = {};

const ListLender = ({}: ListLenderProps) => {
  const { isMasonry, toggleLayout } = useLayoutStore();

  const { posts, selectedTags, toggleTag, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } =
    usePosts();

  if (isPending) return <p>로딩...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <Button
        onClick={() => {
          alert("함수 전달");
        }}
        variant="primaryLine"
        size="md"
      >
        함수 사용
      </Button>
      <Button asChild variant="primaryLine" size="md">
        <Link href="/chat" className="block">
          Link로 사용
        </Link>
      </Button>
      <section>
        <TagsFilter tags={["봄", "여름", "가을", "겨울"]} selectedTags={selectedTags} onToggleTag={toggleTag} />
      </section>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />

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
