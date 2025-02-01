import { fetchOtherUserProfile } from "@/lib/utils/mypage/userInfo";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (userId: string) => {
  const {
    data: userData,
    isPending,
    isError
  } = useQuery({
    queryKey: ["postDetail", userId],
    queryFn: () => fetchOtherUserProfile(userId),
    staleTime: 3000,
    enabled: Boolean(userId)
  });

  return {
    userData,
    isPending,
    isError
  };
};
