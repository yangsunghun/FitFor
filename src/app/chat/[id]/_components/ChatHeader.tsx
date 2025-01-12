"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAdminDetails } from "@/app/chat/_utils/chat";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface ChatRoomHeaderProps {
  roomId: string;
}

const ChatHeader = ({ roomId }: ChatRoomHeaderProps) => {
  const [roomData, setRoomData] = useState<{
    room_title: string;
    room_thumbnail_url: string;
    admin_name: string;
    admin_profile_url: string;
    participant_count: number;
  } | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Step 1: 채팅방 정보 가져오기
        const { data: room, error: roomError } = await supabase
          .from("chat_rooms")
          .select("room_title, room_thumbnail_url")
          .eq("room_id", roomId)
          .single();

        if (roomError || !room) throw roomError || new Error("채팅방 정보를 찾을 수 없습니다.");

        // Step 2: 방장 정보 가져오기
        const adminResult = await getAdminDetails(roomId);
        if (!adminResult.success || !adminResult.data) throw new Error(adminResult.error);

        // Step 3: 참여자 수 가져오기
        const { data: participants, error: participantsError } = await supabase
          .from("chat_members")
          .select("member_id", { count: "exact" })
          .eq("room_id", roomId);

        if (participantsError) throw participantsError;

        // Step 4: State 업데이트
        setRoomData({
          room_title: room.room_title,
          room_thumbnail_url: room.room_thumbnail_url || "", // 기본값 설정
          admin_name: adminResult.data.name || "Unknown Admin", // 기본값 설정
          admin_profile_url: adminResult.data.profileImageUrl || "", // 기본값 설정
          participant_count: participants?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <header className="w-full max-w-[1200px] bg-gray-100 p-6 shadow-md">
      <div className="flex items-center gap-4">
        {/* 방 썸네일 */}
        {roomData.room_thumbnail_url && (
          <Image
            src={roomData.room_thumbnail_url}
            alt={`${roomData.room_title} Thumbnail`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        )}
        {/* 방 정보 */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{roomData.room_title}</h1>
          <p className="text-sm text-gray-600 flex items-center">
            {/* 방장 프로필 이미지 */}
            {roomData.admin_profile_url && (
              <Image
                src={roomData.admin_profile_url}
                alt={`${roomData.admin_name}'s profile`}
                width={24}
                height={24}
                className="mr-2 h-6 w-6 rounded-full object-cover"
              />
            )}
            방장: <span className="font-medium ml-1">{roomData.admin_name}</span>
          </p>
          <p className="text-sm text-gray-600">
            참여 인원:{" "}
            <span className="font-medium">{roomData.participant_count}명</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;