"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { deleteChatRoom } from "@/lib/utils/chat/chat";
import { createClient } from "@/lib/utils/supabase/client";
import { List } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const supabase = createClient();

type ChatHeaderProps = {
  roomId: string;
  currentUserId: string | undefined;
};

const ChatHeader = ({ roomId, currentUserId }: ChatHeaderProps) => {
  const [roomData, setRoomData] = useState<{
    room_title: string;
    room_thumbnail_url: string;
    participant_count: number;
    isAdmin: boolean;
  } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const { data: room, error } = await supabase
          .from("chat_rooms")
          .select("room_title, room_thumbnail_url, user_id")
          .eq("room_id", roomId)
          .single();

        if (error || !room) throw error || new Error("채팅방 정보를 찾을 수 없습니다.");

        const { data: participants, error: participantsError } = await supabase
          .from("chat_members")
          .select("member_id", { count: "exact" })
          .eq("room_id", roomId);

        if (participantsError) throw participantsError;

        setRoomData({
          room_title: room.room_title,
          room_thumbnail_url: room.room_thumbnail_url || "",
          participant_count: participants?.length || 0,
          isAdmin: room.user_id === currentUserId
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId, currentUserId]);

  const handleDeleteRoom = async () => {
    if (!roomData?.isAdmin) {
      alert("방장만 채팅방을 삭제할 수 있습니다.");
      return;
    }

    if (confirm("정말로 채팅방을 삭제하시겠습니까?")) {
      const result = await deleteChatRoom(currentUserId, roomId);
      if (result.success) {
        alert("채팅방이 삭제되었습니다.");
        window.location.href = "/chat";
      } else {
        alert(`채팅방 삭제 실패: ${result.error}`);
      }
    }
  };

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="absolute top-0 z-20 flex w-full items-center justify-between bg-white pb-4">
      <div className="flex items-center gap-3">
        {/* 채팅방 썸네일 이미지 */}
        <figure className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={roomData.room_thumbnail_url || sampleImage} alt="Thumbnail" className="object-cover" fill />
        </figure>

        {/* 채팅방 정보 */}
        <div className="flex flex-col">
          <div className="text-title2 font-bold leading-[27px] text-black">{roomData.room_title}</div>
          <div className="text-caption font-medium leading-tight text-black">
            {roomData.participant_count}명이 채팅에 참여 중
          </div>
        </div>
      </div>

      <div className="relative">
        <button className="flex items-center justify-center" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <List size={32} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
            <button
              onClick={handleDeleteRoom}
              className={`text-sm block w-full px-4 py-2 text-left ${
                roomData.isAdmin ? "text-red-600 hover:bg-red-50" : "cursor-not-allowed text-gray-400"
              }`}
              disabled={!roomData.isAdmin}
            >
              채팅방 삭제하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatHeader;
