import { fetchRecentViewPosts } from "@/lib/utils/mypage/userInfo";
import { getRecentViews } from "@/lib/utils/mypage/userRecentViews";
import { useQuery } from "@tanstack/react-query";

export const useRecentViewPosts = () => {
  const postIds = getRecentViews();

  const {
    data: recentPosts,
    isPending,
    isError
  } = useQuery({
    queryKey: ["recentPosts", postIds],
    queryFn: () => fetchRecentViewPosts(postIds),
    enabled: !!postIds,
    staleTime: 5000
  });

  return {
    recentPosts,
    isPending,
    isError
  };
};
