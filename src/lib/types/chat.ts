import type { Database } from "./supabase";

export type ChatRoomType = Database["public"]["Tables"]["chat_rooms"]["Row"] & {
  user: {
    nickname: string;
    profile_image?: string | null;
  };
  participantCount: number;
};
