"use client";

import { fetchChatRooms } from "@/app/chat/_components/fetchChatRooms";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useChatRoomsInfiniteQuery = (tags: string[], sort: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["chatRooms", tags, sort],
    queryFn: fetchChatRooms,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null // null 반환하여 무한 스크롤 처리
  });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};
