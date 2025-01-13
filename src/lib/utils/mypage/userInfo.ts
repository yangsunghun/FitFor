import type { PostType } from "@/lib/types/post";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchBookmarks = async (userId: string) => {
  const { data: userBookmarks, error: userBookmarksError } = await supabase
    .from("bookmarks")
    .select("post_id, posts(*, users(nickname, profile_image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (userBookmarksError) {
    console.error("북마크 정보 조회 실패:", userBookmarksError);
    throw new Error(`북마크 정보 조회 실패: ${userBookmarksError.message}`);
  }

  // 가져온 데이터의 형태 정리 (post 데이터만 가져오도록)
  const bookmarks = userBookmarks.map((bookmark: { posts: PostType }) => bookmark.posts);

  return bookmarks;
};
