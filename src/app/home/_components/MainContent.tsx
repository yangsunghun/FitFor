"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useAuthStore } from "@/lib/store/authStore";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import { useEffect, useRef } from "react";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";
import OnboardingModal from "./OnboardingModal";

const MainContent = () => {
  const { user } = useAuthStore((state) => state);
  const { isMasonry, toggleLayout } = useLayoutStore();
  const { posts, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } = usePosts();
  const observerRef = useRef(null);

  useEffect(() => {
    // 무한 스크롤 observer
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

  if (isError) return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />

        {isMasonry ? (
          <ListLayout isPending={isPending} posts={posts} />
        ) : (
          <MasonryLayout isPending={isPending} posts={posts} />
        )}

        {hasNextPage && (
          <div ref={observerRef}>
            {isFetchingNextPage ? <LoadingSpinner /> : <p className="text-center">스크롤하여 더보기</p>}
          </div>
        )}

        <OnboardingModal />
      </section>

      {user && <FloatingButton variant="primary" href="/write" />}
    </>
  );
};

export default MainContent;
