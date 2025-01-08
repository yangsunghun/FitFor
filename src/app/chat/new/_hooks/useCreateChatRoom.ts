import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateChatRoom = (onSuccess: (next: string) => void) => {
  const supabase = createClient();
  return useMutation(
    async (chatRoomData: {
      room_title: string;
      room_description: string;
      room_hash_tags: string[];
      room_thumbnail_url: string;
      room_admin_id: string;
    }) => {
      const { data, error } = await supabase.from("chat_rooms").insert({
        room_title: chatRoomData.room_title,
        room_description: chatRoomData.room_description,
        room_hash_tags: chatRoomData.room_hash_tags,
        room_thumbnail_url: chatRoomData.room_thumbnail_url,
        room_admin_id: chatRoomData.room_admin_id,
        created_at: new Date(),
        isActive: true // 기본값 활성 상태
      });

      if (error) {
        console.error("Chat room creation failed:", error);
        throw new Error("채팅방 생성 실패");
      }

      return data;
    },
    {
      onSuccess: () => {
        console.log("채팅방 생성 성공");
        onSuccess(); // 성공 시 호출
      },
      onError: (error) => {
        console.error("채팅방 생성 실패:", error);
      }
    }
  );
};
