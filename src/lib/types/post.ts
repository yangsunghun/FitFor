import type { Database } from "./supabase";

export type PostType = Database["public"]["Tables"]["posts"]["Row"];

export type FetchPostsResponse = {
  items: PostType[];
  nextPage?: number;
  hasMore: boolean;
};
