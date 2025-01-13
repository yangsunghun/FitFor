import { fetchSearchPosts } from "@/lib/utils/search/fetchSearchPosts";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (query: string, page: number, tags: string[]) => {
  return useQuery({
    queryKey: ["searchResults", query, page, tags],
    queryFn: () => fetchSearchPosts({ query, page, tags }),
    staleTime: 5000
  });
};
