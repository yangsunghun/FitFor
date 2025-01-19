"use client";

import { FloatingButton } from "@/components/ui/FloatingButton";
import ModalItem from "@/components/ui/Modal";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useAuthStore } from "@/lib/store/authStore";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import { useEffect, useRef, useState } from "react";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

const ListLender = () => {
  const { user, setUser } = useAuthStore();
  const [onboardModal, setOnboardModal] = useState(false);
  const { isMasonry, toggleLayout } = useLayoutStore();
  const { posts, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } = usePosts();

  const observerRef = useRef(null);

  useEffect(() => {
    if (user && !user.onboard) {
      setOnboardModal(true);
    }
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
  }, [fetchNextPage, hasNextPage, user]);

  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />
        {isMasonry ? <ListLayout posts={posts} /> : <MasonryLayout isPending={isPending} posts={posts} />}

        {hasNextPage && <div ref={observerRef}>{isFetchingNextPage ? "불러오는 중 로딩" : "더보기"}</div>}

        <ModalItem isOpen={onboardModal} onClose={() => setOnboardModal(false)}>
          <div>
            {/* TODO: 온보딩 로직 추가 */}
            <p>온보딩 모달 테스트</p>
          </div>
        </ModalItem>
      </section>

      <FloatingButton variant="primary" href="/write" />
    </>
  );
};

export default ListLender;
