import type { Database } from "./supabase";

export type PostType = Database["public"]["Tables"]["posts"]["Row"] & {
  users: { nickname: string; profile_image?: string | null };
};

export type FetchPostsResponse = {
  items: PostType[];
  nextPage?: number;
  hasMore: boolean;
};

export type Purchase = Database["public"]["Tables"]["purchase"]["Row"];

export type OwnPostType = Database["public"]["Tables"]["posts"]["Row"];

export type FetchOwnPostsResponse = {
  items: OwnPostType[];
  nextPage?: number;
  hasMore: boolean;
};
