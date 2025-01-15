"use client";

import Cardpost from "@/components/shared/CardPost";
import { useUserPosts } from "@/lib/hooks/mypage/useUserPosts";
import { useEffect, useRef } from "react";

const MyPostsData = () => {
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

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>내 게시물 불러오기 에러...</p>;

  return (
    <div>
      {userPosts?.pages.map((page, i) => (
        <div className="mt-8 grid grid-cols-4 gap-6" key={`${page}_${i}`}>
          {page.items.map((post) => (
            <Cardpost key={post.id} post={post} isMasonry />
          ))}
        </div>
      ))}
      <div ref={observerRef} className="h-5">
        {hasNextPage && (isFetchingNextPage ? <p>로딩 중...</p> : <p>더 보기</p>)}
      </div>
    </div>
  );
};

export default MyPostsData;
