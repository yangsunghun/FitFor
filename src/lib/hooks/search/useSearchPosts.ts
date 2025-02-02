import { fetchSearchPosts } from "@/lib/utils/search/fetchSearchPosts";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (query: string, page: number, tags: string[], sort: any) => {
  const {
    data: Results,
    isPending,
    isError
  } = useQuery({
    queryKey: ["searchResults", query, page, tags, sort],
    queryFn: () => fetchSearchPosts({ query, page, tags, sort }),
    placeholderData: (prevData) => prevData,
    staleTime: 5000
  });

  return {
    Results,
    isPending,
    isError
  };
};
