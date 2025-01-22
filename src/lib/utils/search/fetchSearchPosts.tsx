import { POSTS_PER_PAGE } from "@/lib/constants/constants";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 검색된 게시물 요청
export const fetchSearchPosts = async ({
  query,
  page = 1,
  tags = [],
  perPage = POSTS_PER_PAGE,
  sort = "created_at"
}: {
  query: string;
  page?: number;
  tags?: string[];
  perPage?: number;
  sort?: "created_at" | "likes" | "view";
}) => {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let baseQuery = supabase
    .from("posts")
    .select(
      `
      *,
      users (
        nickname
      )
    `,
      { count: "exact" }
    )
    .eq("is_saved", false)
    .ilike("content", `%${query}%`)
    .order(sort, { ascending: false })
    .range(from, to);

  // 태그 포함시 결과로 출력
  if (tags.length > 0) {
    baseQuery = baseQuery.contains("tags", tags);
  }

  const { data: posts, error, count } = await baseQuery;

  if (error) {
    throw new Error(`검색 결과를 가져오는 중 오류 발생: ${error.message}`);
  }

  return {
    items: posts || [],
    total: count || 0
  };
};
