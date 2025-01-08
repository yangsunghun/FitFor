import type { Database } from "@/lib/types/supabase";
import { createClient } from "../supabase/client";

type PostType = Database["public"]["Tables"]["posts"]["Row"];

type FetchPostsResponse = {
  items: PostType[];
  nextPage?: number;
  hasMore: boolean;
};

export const fetchPosts = async ({ pageParam = 1 }): Promise<FetchPostsResponse> => {
  const perPage = 8;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    items: data || [],
    nextPage: data?.length === perPage ? pageParam + 1 : undefined,
    hasMore: data?.length === perPage
  };
};
