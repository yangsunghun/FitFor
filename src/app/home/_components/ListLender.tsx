"use client";

import { FloatingButton } from "@/components/ui/FloatingButton";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

type ListLenderProps = {};

const ListLender = ({}: ListLenderProps) => {
  const { isMasonry, toggleLayout } = useLayoutStore();

  const { posts, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } = usePosts();

  if (isPending) return <p>로딩...</p>;
  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />

        {isMasonry ? <ListLayout posts={posts} /> : <MasonryLayout posts={posts} />}

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

      <FloatingButton variant="primary" href="/write" />
    </>
  );
};

export default ListLender;
