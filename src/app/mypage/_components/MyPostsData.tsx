"use client";

import { useUserPosts } from "@/lib/hooks/mypage/useUserPosts";
import { useEffect, useRef } from "react";

const MyPostsData = () => {
  const { userPosts, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useUserPosts();
  const observerRef = useRef();

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
  console.log("MyPostsData pages items", userPosts!.pages[0].items);

  return (
    <div>
      {userPosts?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((post) => (
            <p key={post.id}>post</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyPostsData;
