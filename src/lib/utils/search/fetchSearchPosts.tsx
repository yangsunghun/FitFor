import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 검색된 게시물 요청
export const fetchSearchPosts = async ({
  query,
  page = 1,
  perPage = 12
}: {
  query: string;
  page?: number;
  perPage?: number;
}) => {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const {
    data: posts,
    error,
    count
  } = await supabase
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

  if (error) {
    throw new Error(`검색 결과를 가져오는 중 오류 발생: ${error.message}`);
  }

  return {
    items: posts || [],
    total: count || 0
  };
};
