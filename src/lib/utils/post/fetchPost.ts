import { createClient } from "../supabase/client";

export const fetchPosts = async ({ pageParam = 1 }) => {
  const perPage = 8;
  const from = (pageParam - 1) * perPage;
  const to = from + perPage - 1;

  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*").range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    items: data || [],
    nextPage: data?.length === perPage ? pageParam + 1 : undefined
  };
};
