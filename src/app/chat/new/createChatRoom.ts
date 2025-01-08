import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://your-project.supabase.co", "your-anon-key");

interface ChatRoomData {
  room_title: string;
  room_subtitle: string;
  room_description: string;
  room_hash_tags: string[];
  room_thumbnail_url: string;
  isActive: boolean;
  room_admin_id: string;
}

export const createChatRoom = async (data: Omit<ChatRoomData, "room_admin_id">) => {
  // 로그인한 유저 정보 가져오기
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("chat_rooms").insert([
    {
      ...data,
      room_admin_id: user.id // 유저 ID를 포함
    }
  ]);

  if (error) {
    throw new Error(`채팅방 생성 실패: ${error.message}`);
  }
};
