"use client";

import { FloatingButton } from "@/components/ui/FloatingButton";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import { useEffect, useRef } from "react";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

const ListLender = () => {
  const { isMasonry, toggleLayout } = useLayoutStore();

  const { posts, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } = usePosts();

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />
        {isMasonry ? (
          <ListLayout isPending={isPending} posts={posts} />
        ) : (
          <MasonryLayout isPending={isPending} posts={posts} />
        )}

        {hasNextPage && <div ref={observerRef}>{isFetchingNextPage ? "불러오는 중 로딩" : "더보기"}</div>}
      </section>

      <FloatingButton variant="primary" href="/write" />
    </>
  );
};

export default ListLender;
