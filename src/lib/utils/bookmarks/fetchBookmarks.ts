import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchBookmarks = async (userId: string) => {
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("post_id").eq("user_id", userId);

  if (error) {
    throw new Error(`북마크 데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`);
  }

  if (bookmarks.length === 0) {
    return [];
  }

  const postIds = bookmarks.map((bookmark) => bookmark.post_id);

  const { data: posts, error: postError } = await supabase
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
    .in("id", postIds);

  if (postError) {
    throw new Error(`게시물 데이터를 가져오는 중 오류가 발생했습니다: ${postError.message}`);
  }

  return posts;
};
