import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserPostsPerPage } from "@/lib/utils/mypage/userInfo";
import { useInfiniteQuery } from "@tanstack/react-query";

// 유저 게시물 데이터 (무한스크롤)
export const useUserPosts = (userId: string) => {
  // enabled 활용하기
  const { user } = useAuthStore();

  // 타입 추론: <FetchOwnPostsResponse, Error, InfiniteData<FetchOwnPostsResponse>, string[], number>
  const {
    data: userPosts, // 가져온 모든 페이지 데이터
    fetchNextPage, // 다음 페이지 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지가 존재하는지 여부
    isFetchingNextPage, // 다음 페이지를 가져오는 중인지 여부
    isPending, // 첫 로딩 상태 여부
    isError // 에러 발생 여부
  } = useInfiniteQuery({
    queryKey: ["userPosts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return fetchUserPostsPerPage({ userId, pageParam });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!user
  });

  return {
    userPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  };
};
