import { fetchSearchPosts } from "@/lib/utils/search/fetchSearchPosts";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (query: string, page: number) => {
  return useQuery({
    queryKey: ["searchResults", query, page],
    queryFn: () => fetchSearchPosts({ query, page }),
    staleTime: 5000
  });
};
