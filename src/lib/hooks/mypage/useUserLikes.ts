import { fetchUserLikes } from "@/lib/utils/mypage/userInfo";
import { useQuery } from "@tanstack/react-query";

export const useUserLikes = (userId: string) => {
  const queryKey = ["userLikes"];

  // 유저의 좋아요 정보 가져오기
  const {
    data: userLikes,
    isPending,
    isFetching
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetchUserLikes(userId);
    },
    enabled: !!userId
  });

  return {
    userLikes,
    isPending,
    isFetching
  };
};
