"use client";

import Cardpost from "@/components/shared/CardPost";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useUserPosts } from "@/lib/hooks/mypage/useUserPosts";
import { useEffect, useRef } from "react";

const MyPosts = () => {
  const { userPosts, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useUserPosts();
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <p>내 게시물 불러오기 에러...</p>;

  return (
    <>
      {/* 작성한 게시물 없는 경우 */}
      {userPosts?.pages[0].items.length === 0 && (
        <div className="mt-32 flex items-center justify-center">
          <p className="text-title2 font-medium text-text-03">작성한 게시물이 없습니다.</p>
        </div>
      )}
      {/* 작성한 게시물 무한 스크롤 */}
      {userPosts?.pages.map((page, i) => (
        <div className="mt-10 grid grid-cols-4 gap-6" key={`${page}_${i}`}>
          {page.items.map((post) => (
            <Cardpost key={post.id} post={post} isMasonry={false} />
          ))}
        </div>
      ))}
      {hasNextPage && (
        <div ref={observerRef} className="h-5">
          {isFetchingNextPage ? <p>로딩 중...</p> : <p>더 보기</p>}
        </div>
      )}
    </>
  );
};

export default MyPosts;
