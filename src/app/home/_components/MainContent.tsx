"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import FloatingButton from "@/components/ui/FloatingButton";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useAuthStore } from "@/lib/store/authStore";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import { PencilSimple } from "@phosphor-icons/react";
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

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // 무한 스크롤 observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isError) return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <section className="relative">
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />

        {isMasonry ? (
          <ListLayout isPending={isPending} posts={posts} />
        ) : (
          <MasonryLayout isPending={isPending} posts={posts} />
        )}

        <div className="absolute bottom-0 left-0 h-[10vh] w-full bg-gradient-to-t from-bg-01 to-transparent"></div>
      </section>

      {hasNextPage ? (
        <div ref={observerRef}>
          {isFetchingNextPage ? (
            <LoadingSpinner />
          ) : (
            <p className="pt-[10vh] text-center text-subtitle font-medium text-text-02">스크롤하여 더보기</p>
          )}
        </div>
      ) : (
        <p className="pt-[10vh] text-center text-subtitle font-medium text-text-02">마지막 게시물 입니다</p>
      )}

      <OnboardingModal />

      {user && (
        <FloatingButton
          href="/write"
          icon={
            <PencilSimple className="mr-2 inline-block text-text-03" size={isTabletOrSmaller ? 16 : 20} weight="fill" />
          }
        />
      )}
    </>
  );
};

export default MainContent;
