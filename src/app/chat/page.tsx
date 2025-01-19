"use client";

import { useState, useEffect } from "react";
import { ChatRoomType } from "@/lib/types/chat";
import { createClient } from "@/lib/utils/supabase/client";
import ChatRoomCard from "./_components/ChatRoomCard";
import FilterTabs from "./_components/Filter";
import { FloatingButton } from "@/components/ui/FloatingButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const supabase = createClient();

const ChatRoomListPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [filteredChatRooms, setFilteredChatRooms] = useState<ChatRoomType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChatRooms = async () => {
    const { data, error } = await supabase.from("chat_rooms").select(`
      room_id,
      user_id,
      room_title,
      room_thumbnail_url,
      room_tags,
      isActive,
      created_at,
      chat_members (
        member_id
      ),
      users!user_id (nickname, profile_image)
    `);

    if (error) {
      console.error(error.message);
      return [];
    }

    return data.map((room) => ({
      ...room,
      participantCount: room.chat_members.length,
      user: room.users
    }));
  };

  useEffect(() => {
    const loadChatRooms = async () => {
      setLoading(true);
      const rooms = await fetchChatRooms();
      setChatRooms(rooms);
      setFilteredChatRooms(rooms);
      setLoading(false);
    };

    loadChatRooms();
  }, []);

  const handleFilterChange = (selectedTags: { [key: string]: string[] }) => {
    const filteredRooms = chatRooms.filter((room) =>
      Object.keys(selectedTags).every((key) =>
        selectedTags[key]?.length === 0 ? true : selectedTags[key].some((tag) => room.room_tags?.includes(tag))
      )
    );

    setFilteredChatRooms(filteredRooms);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="py-10 text-title1 font-bold text-text-04">Live</div>

      <div className="mb-28">
        <FilterTabs onFilterChange={handleFilterChange} />
      </div>

      <div className="flex" >
        <div className="grid grid-cols-5 gap-4">
          {filteredChatRooms.map((chatRoom) => (
            <ChatRoomCard key={chatRoom.room_id} chatRoom={chatRoom} />
          ))}
        </div>
      </div>

      <FloatingButton variant="primary" href="/chat/new" />
    </div>
  );
};

export default ChatRoomListPage;
