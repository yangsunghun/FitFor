import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const fetchChatRooms = async ({ pageParam = 1, queryKey }: { pageParam?: number; queryKey: (string | string[])[] }) => {
  const [, tags = [], sort = "created_at"] = queryKey as [string, string[]?, string?];
  const limit = 10;
  const offset = (pageParam - 1) * limit;

  let supabaseQuery = supabase
    .from("chat_rooms")
    .select(
      `
      room_id, user_id, room_title, room_thumbnail_url, room_tags, isActive, created_at,
      chat_members!room_id (member_id),
      users!user_id (nickname, profile_image),
      chat_fevertime_rooms!room_id (room_id)
      `
    )
    .order(sort, { ascending: sort !== "created_at" }) // 최신순 정렬
    .range(offset, offset + limit - 1);

  // 태그 필터 적용
  if (tags.length > 0) {
    supabaseQuery = supabaseQuery.contains("room_tags", tags);
  }

  const { data, error } = await supabaseQuery;
  if (error) {
    console.error(error.message);
    throw new Error("채팅방 데이터를 가져오지 못했습니다.");
  }

  // 참여자 수(`participantCount`)와 Fevertime(`isFevertime`) 변환
  return {
    chatRooms: data.map((room) => ({
      ...room,
      participantCount: room.chat_members?.length || 0, 
      user: room.users,
      isFevertime: !!room.chat_fevertime_rooms?.length 
    })),
    nextPage: data.length === limit ? pageParam + 1 : null 
  };
};