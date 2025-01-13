import { fetchSearchPosts } from "@/lib/utils/search/fetchSearchPosts";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (query: string, page: number, tags: string[], sort: any) => {
  return useQuery({
    queryKey: ["searchResults", query, page, tags, sort],
    queryFn: () => fetchSearchPosts({ query, page, tags, sort }),
    staleTime: 5000
  });
};
