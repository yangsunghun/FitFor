import { fetchSearchPosts } from "@/lib/utils/search/fetchSearchPosts";
import { useQuery } from "@tanstack/react-query";

export const useLocationPosts = (query: string, page: number, sort: any) => {
  const {
    data: Results,
    isPending,
    isError
  } = useQuery({
    queryKey: ["searchResults", query, page, sort],
    queryFn: () => fetchSearchPosts({ query, page, sort }),
    placeholderData: (prevData) => prevData,
    staleTime: 5000
  });

  return {
    Results,
    isPending,
    isError
  };
};
