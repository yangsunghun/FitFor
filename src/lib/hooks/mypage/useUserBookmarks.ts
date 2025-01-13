import { fetchUserBookmarks } from "@/lib/utils/mypage/userInfo";
import { useQuery } from "@tanstack/react-query";

export const useUserBookmarks = (userId: string) => {
  const queryKey = ["userBookmarks"];

  // 유저의 북마크 데이터 가져오기
  const { data: userBookmarks, isPending, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetchUserBookmarks(userId);
    },
    enabled: !!userId,
    staleTime: 5000
  });

  return {
    userBookmarks,
    isPending,
    isFetching
  };
};
