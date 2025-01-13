import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 검색된 게시물 요청
export const fetchSearchPosts = async ({
  query,
  page = 1,
  tags = [],
  perPage = 12
}: {
  query: string;
  page?: number;
  tags?: string[];
  perPage?: number;
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
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false })
    .range(from, to);

  // 태그 포함시 결과로 출력
  if (tags.length > 0) {
    baseQuery = baseQuery.overlaps("tags", tags);
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
