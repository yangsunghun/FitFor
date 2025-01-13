"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import ContentList from "./ContentList";
import { fetchBookmarks } from "@/lib/utils/mypage/userInfo";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const { data: userBookmarks, isPending } = useQuery({
    queryKey: ["userBookmarks"],
    queryFn: async () => {
      return fetchBookmarks(user!.id)
    },
    enabled: !!user,
  });

  if (isPending) return <p>스켈레톤 UI 필요...</p>;

  return userBookmarks && <ContentList title="내가 북마크한 포스트" subtitle="Bookmarks" posts={userBookmarks} />;
};

export default BookmarkList;
