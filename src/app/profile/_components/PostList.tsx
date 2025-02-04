"use client";

import Cardpost from "@/components/shared/CardPost";
import CardSkeleton from "@/components/shared/CardSkeleton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useUserPosts } from "@/lib/hooks/profile/useUserPosts";

import { useEffect, useRef } from "react";

type Props = {
  userId: string;
};

const PostList = ({ userId }: Props) => {
  const { userPosts, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useUserPosts(userId);
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

  if (isError) return <p>내 게시물 불러오기 에러...</p>;

  return (
    <>
      {isPending ? (
        <div className="mt-10 grid grid-cols-4 gap-6 lt:mx-4 tb:grid-cols-3 tb:gap-4 mb:grid-cols-2 mb:gap-[12px]">
          {[...Array(8)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : userPosts?.pages[0].items.length === 0 ? (
        <div className="mt-32 flex items-center justify-center">
          <p className="text-title2 font-medium text-text-03">작성한 게시물이 없습니다.</p>
        </div>
      ) : (
        userPosts?.pages.map((page, i) => (
          <div
            className="mt-10 grid grid-cols-4 gap-6 lt:mx-4 tb:grid-cols-3 tb:gap-4 mb:grid-cols-2 mb:gap-[12px]"
            key={`${page}_${i}`}
          >
            {page.items.map((post) => (
              <Cardpost key={post.id} post={post} isMasonry={false} />
            ))}
          </div>
        ))
      )}
      {hasNextPage && (
        <div ref={observerRef} className="h-5">
          {isFetchingNextPage ? <LoadingSpinner /> : <p>더 보기</p>}
        </div>
      )}
    </>
  );
};

export default PostList;
