import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchMessages = async (roomId: string) => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select(
      `
      *,
      chat_members (
        users (
          nickname,
          profile_image
        )
      )
    `
    )
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};
