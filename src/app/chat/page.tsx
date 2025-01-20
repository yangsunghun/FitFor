"use client";

import { useState } from "react";
import { ChatRoomType } from "@/lib/types/chat";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ChatRoomCard from "./_components/ChatRoomCard";
import FilterTabs from "./_components/RoomFilters";
import { FloatingButton } from "@/components/ui/FloatingButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import SortChatRooms from "./_components/SortChatRooms";

const supabase = createClient();

const fetchChatRooms = async (): Promise<ChatRoomType[]> => {
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
    users!user_id (nickname, profile_image),
    chat_fevertime: chat_fevertime_rooms(room_id)
  `);

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch chat rooms");
  }

  return data.map((room) => ({
    ...room,
    participantCount: room.chat_members.length,
    user: room.users,
    isFevertime: !!room.chat_fevertime?.length // fever..time..? 추가
  }));
};

const ChatRoomListPage = () => {
  const [sortKey, setSortKey] = useState("created_at");
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string[] }>({});

  const { data: chatRooms = [], isLoading } = useQuery<ChatRoomType[]>({
    queryKey: ["chatRooms"],
    queryFn: fetchChatRooms,
    staleTime: 1000 * 60 * 5
  });

  // 필터링된 채팅방 목록
  const filteredChatRooms = chatRooms.filter((room) =>
    Object.keys(selectedTags).every((key) =>
      selectedTags[key]?.length === 0 ? true : selectedTags[key].some((tag) => room.room_tags?.includes(tag))
    )
  );

  // 정렬된 채팅방 목록
  const sortedChatRooms = [...filteredChatRooms].sort((a, b) => {
    if (sortKey === "created_at") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortKey === "fevertime") {
      return Number(b.isFevertime) - Number(a.isFevertime);
    }

    return 0; // 추가 정렬 기준 구현 가능
  });

  const handleFilterChange = (tags: { [key: string]: string[] }) => {
    setSelectedTags(tags);
  };

  const handleSortChange = (key: string) => {
    setSortKey(key);
  };

  return (
    <div className="inner pb-40">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between py-10">
        <h2 className="text-title1 font-bold text-text-04">Live</h2>
      </div>

      {/* 필터 탭 */}
      <section>
        <FilterTabs onFilterChange={handleFilterChange} />
      </section>

      {/* 정렬 옵션 */}
      <SortChatRooms currentSort={sortKey} onSortChange={handleSortChange} />

      {/* 채팅방 목록 */}
      <section className="mt-8">
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {sortedChatRooms.map((chatRoom) => (
              <ChatRoomCard key={chatRoom.room_id} chatRoom={chatRoom} />
            ))}
          </div>
        )}
      </section>

      {/* 플로팅 버튼 */}
      <FloatingButton variant="primary" href="/chat/new" />
    </div>
  );
};

export default ChatRoomListPage;
