"use client";

import GridPost from "@/components/shared/GridPost";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRecentViewPosts } from "@/lib/hooks/mypage/useRecentViewPosts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const RecentViewPosts = () => {
  const { recentPosts, isPending, isError } = useRecentViewPosts();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["recentPosts"] });
  });

  if (isError) {
    return <p>최근 조회된 포스트를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      {recentPosts?.length === 0 && (
        <div className="mt-32 flex items-center justify-center">
          <p className="text-title2 font-medium text-text-03">최근 조회한 게시물이 없습니다.</p>
        </div>
      )}
      {/* 나중에 검색 포스트 컴포넌트 나오면 수정 예정... */}
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <ul className="mt-10 grid grid-cols-4 gap-6">
          {recentPosts?.map((post) => <GridPost key={post.id} post={post} />)}
        </ul>
      )}
    </>
  );
};

export default RecentViewPosts;
