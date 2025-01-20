import type { Database } from "./supabase";

export type ChatRoomType = Database["public"]["Tables"]["chat_rooms"]["Row"] & {
  user: {
    nickname: string;
    profile_image?: string | null;
  };
  participantCount: number;
  isFevertime: boolean;
};

export type ChatMember = {
  users: {
    profile_image?: string | null;
    nickname?: string;
  };
};

export type ChatMessage = {
  message_id: string;
  room_id: string;
  member_id: string;
  content?: string | null;
  image_url?: string | null;
  created_at: string;
  chat_members?: ChatMember;
};