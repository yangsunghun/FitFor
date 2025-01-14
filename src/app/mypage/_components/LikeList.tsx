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
  const { userLikes, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, isRefetching } = useUserLikes(
    user?.id || ""
  );

  useEffect(() => {
    if (user?.id) queryClient.invalidateQueries({ queryKey: ["userLikes"] });
  }, [queryClient, user?.id]);

  if (isError) return <p>좋아요 불러오기 오류 발생 ...</p>;

  return (
    <>
      {isPending || isRefetching ? (
        <ContentListSkeleton title="좋아요한 포스트" subtitle="Likes" />
      ) : (
        // <ContentList title="좋아요한 포스트" subtitle="Bookmarks" posts={userLikes!} />
        <ContentList
          title="좋아요한 포스트"
          subtitle="Likes"
          posts={userLikes}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

export default LikeList;
