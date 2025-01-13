"use client";

import { useUserLikes } from "@/lib/hooks/mypage/useUserLikes";
import { useAuthStore } from "@/lib/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ContentList from "./ContentList";
import ContentListSkeleton from "./SkeletonContentList";

const LikeList = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { userLikes, isPending, isFetching } = useUserLikes(user?.id || "");

  useEffect(() => {
    if (user?.id) queryClient.invalidateQueries({ queryKey: ["userLikes"] });
  }, [queryClient, user?.id]);

  return (
    <>
      {isPending || isFetching ? (
        <ContentListSkeleton />
      ) : (
        <ContentList title="좋아요한 포스트" subtitle="Bookmarks" posts={userLikes!} />
      )}
    </>
  );
};

export default LikeList;
