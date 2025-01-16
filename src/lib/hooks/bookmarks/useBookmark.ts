import { fetchBookmarks } from "@/lib/utils/bookmarks/fetchBookmarks";
import { useQuery } from "@tanstack/react-query";

export const useBookmarks = (userId: string) => {
  const {
    data: ownBookmarks,
    isPending,
    isError
  } = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => fetchBookmarks(userId),
    enabled: !!userId,
    staleTime: 5000
  });

  return {
    ownBookmarks,
    isPending,
    isError
  };
};
