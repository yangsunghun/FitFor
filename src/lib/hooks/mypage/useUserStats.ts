import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserPostsStats } from "@/lib/utils/mypage/userInfo";
import { useQuery } from "@tanstack/react-query";

export const useUserStats = () => {
  // 유저 zustand에서 불러오기
  const { user } = useAuthStore();
  let allStats = { view: 0, likes: 0 };

  const {
    data: userPostsStats,
    isPending,
    isError
  } = useQuery({
    queryKey: ["postsStats"],
    queryFn: async () => fetchUserPostsStats(user!.id),
    enabled: !!user
  });
  console.log(userPostsStats);

  if (userPostsStats) {
    allStats = userPostsStats.reduce(
      (acc, obj) => {
        acc.view += obj.view;
        acc.likes += obj.likes;
        return acc;
      },
      { view: 0, likes: 0 }
    );
  }

  return { userPostsStats, allStats, isPending, isError };
};
