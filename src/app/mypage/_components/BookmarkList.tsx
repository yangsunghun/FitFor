"use client";

import { useUserBookmarks } from "@/lib/hooks/mypage/useUserBookmarks";
import { useAuthStore } from "@/lib/store/authStore";
import ContentList from "./ContentList";
import ContentListSkeleton from "./SkeletonContentList";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { userBookmarks, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, isRefetching } = useUserBookmarks(
    user?.id || ""
  );

  useEffect(() => {
    if (user?.id) queryClient.invalidateQueries({ queryKey: ["userBookmarks"] });
  }, [queryClient, user?.id]);

  if (isError) return <p>오류 발생 ...</p>;
  console.log("bookmark list 다음 페이지 존재", hasNextPage)

  return (
    <>
      {isPending || isRefetching ? (
        <ContentListSkeleton />
      ) : (
        <ContentList
          title="내가 북마크한 포스트"
          subtitle="Bookmarks"
          posts={userBookmarks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

export default BookmarkList;
