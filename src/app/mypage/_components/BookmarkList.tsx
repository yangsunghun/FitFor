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
  const { userBookmarks, isPending, isFetching } = useUserBookmarks(user?.id || "");

  useEffect(() => {
    if (user?.id) queryClient.invalidateQueries({ queryKey: ["userBookmarks"] });
  }, [queryClient, user?.id]);

  return (
    <>
      {isFetching || isPending ? (
        <ContentListSkeleton />
      ) : (
        <ContentList title="내가 북마크한 포스트" subtitle="Bookmarks" posts={userBookmarks!} />
      )}
    </>
  );
};

export default BookmarkList;
