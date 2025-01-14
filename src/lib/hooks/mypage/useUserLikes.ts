import type { FetchPostsResponse } from "@/lib/types/post";
import { fetchUserLikes } from "@/lib/utils/mypage/userInfo";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";

export const useUserLikes = (userId: string) => {
  const queryKey = ["userLikes", userId];

  // 유저의 좋아요 데이터 가져오기
  const {
    data: userLikes, // 가져온 모든 페이지 데이터
    fetchNextPage, // 다음 페이지 데이터를 가져오는 함수
    hasNextPage, // 다음 페이지가 존재하는지 여부
    isFetchingNextPage, // 다음 페이지를 가져오는 중인지 여부
    isPending, // 첫 로딩 상태 여부
    isError, // 에러 발생 여부
    isRefetching
  } = useInfiniteQuery<FetchPostsResponse, Error, InfiniteData<FetchPostsResponse>, string[], number>({
    queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      return fetchUserLikes({ userId, pageParam });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    enabled: Boolean(userId) // 유저 아이디가 "", null, undefined일때 실행 X
  });

  // 가져온 데이터 정리
  const allLikes = userLikes?.pages.flatMap((page) => page.items) || [];

  return {
    userLikes: allLikes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    isRefetching
  };
};
