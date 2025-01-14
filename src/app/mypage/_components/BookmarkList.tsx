"use client";

import { useUserBookmarks } from "@/lib/hooks/mypage/useUserBookmarks";
import { useAuthStore } from "@/lib/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ContentList from "./ContentList";
import ContentListSkeleton from "./SkeletonContentList";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { userBookmarks, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, isRefetching } =
    useUserBookmarks(user?.id || "");

  useEffect(() => {
    if (user?.id) queryClient.invalidateQueries({ queryKey: ["userBookmarks"] });
  }, [queryClient, user?.id]);

  if (isError) return <p>북마크 불러오기 오류 발생 ...</p>;

  return (
    <>
      {isPending || isRefetching ? (
        <ContentListSkeleton title="내가 북마크한 포스트" subtitle="Bookmarks" />
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
