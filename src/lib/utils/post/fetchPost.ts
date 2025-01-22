import type { FetchPostsResponse } from "@/lib/types/post";
import { createClient } from "@/lib/utils/supabase/client";

export const fetchPosts = async ({ pageParam = 1 }): Promise<FetchPostsResponse> => {
  const perPage = 16;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const supabase = await createClient();

  const { data: postsData, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      users (
        nickname,
        profile_image
      )
    `
    )
    .eq("is_saved", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    items: postsData || [],
    nextPage: postsData?.length === perPage ? pageParam + 1 : undefined,
    hasMore: postsData?.length === perPage
  };
};
