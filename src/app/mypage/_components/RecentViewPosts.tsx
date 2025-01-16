"use client";

import { useRecentViewPosts } from "@/lib/hooks/mypage/useRecentViewPosts";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const RecentViewPosts = () => {
  const { recentPosts, isPending, isError } = useRecentViewPosts();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["recentPosts"] });
  }, []);

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
        <p>로딩 중 ...</p>
      ) : (
        <ul className="mt-8 grid grid-cols-4 gap-5">
          {recentPosts?.map((post) => (
            <li key={post.id} className="relative">
              <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
              <figure className="relative h-[250px] w-full overflow-hidden bg-gray-200">
                <Image src={post.thumbnail} alt={post.title} width={300} height={300} className="object-cover" />
              </figure>

              <p className="text-lg font-bold">{post.title}</p>
              <p className="text-sm text-gray-500">작성자: {post.users?.nickname || "익명"}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RecentViewPosts;
