import type { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";

type BookmarksInsert = Database["public"]["Tables"]["bookmarks"]["Insert"];

// 북마크 추가
export const addBookmark = async (bookmark: BookmarksInsert) => {
  const supabase = createClient();

  const { data: bookmarkData, error } = await supabase.from("bookmarks").insert([bookmark]);

  if (error) {
    throw new Error(`Failed to add bookmark: ${error.message}`);
  }

  return bookmarkData;
};

// 북마크 삭제
export const removeBookmark = async (userId: string, postId: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("bookmarks").delete().match({ user_id: userId, post_id: postId });

  if (error) {
    throw new Error(`Failed to remove bookmark: ${error.message}`);
  }
};

// 사용자가 북마크 했는지 확인
export const isPostBookmarked = async (postId: string, userId: string) => {
  const supabase = createClient();

  const { data: userBookmark, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to fetch bookmark status: ${error.message}`);
  }

  return !!userBookmark;
};
