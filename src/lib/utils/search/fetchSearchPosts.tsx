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
    .order(sort, { ascending: false })
    .range(from, to);

  // query를 content, upload_place, tags에서 검색
  if (query?.trim()) {
    baseQuery = baseQuery.or(`content.ilike.%${query}%,upload_place.ilike.%${query}%,tags.cs.{${query}}`);
  }

  // 태그 필터 조건 추가
  if (tags.length > 0) {
    baseQuery = baseQuery.contains("tags", tags);
  }

  const { data: posts, error, count } = await baseQuery;

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`검색 결과를 가져오는 중 오류 발생: ${error.message}`);
  }

  return {
    items: posts || [],
    total: count || 0
  };
};
