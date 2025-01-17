"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import React from "react";
import { deleteChatRoom } from "../../_utils/chat";
import Image from "next/image";
import { List } from "@phosphor-icons/react";
import sampleImage from "@/assets/images/image_sample.png";

const supabase = createClient();

type ChatHeaderProps = {
  roomId: string;
  currentUserId: string | undefined; // 현재 로그인한 사용자의 ID
};

const ChatHeader = ({ roomId, currentUserId }: ChatHeaderProps) => {
  const [roomData, setRoomData] = useState<{
    room_title: string;
    room_thumbnail_url: string;
    participant_count: number;
    isAdmin: boolean; // 방장 여부
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
        window.location.href = "/chat"; // 리다이렉션
      } else {
        alert(`채팅방 삭제 실패: ${result.error}`);
      }
    }
  };

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <header className="relative flex h-[96px] w-[1200px] items-center justify-between bg-white px-[102px]">
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
    </header>
  );
};

export default ChatHeader;

// "use client";
// import { createClient } from "@/lib/utils/supabase/client";
// import React, { useEffect, useState } from "react";
// import { getAdminDetails } from "../../_utils/chat";
// import Image from "next/image";
// import { List } from "@phosphor-icons/react";
// import sampleImage from "@/assets/images/image_sample.png";

// const supabase = createClient();

// type ChatHeaderProps = {
//   roomId: string;
// };

// const ChatHeader = ({ roomId }: ChatHeaderProps) => {
//   const [roomData, setRoomData] = useState<{
//     room_title: string;
//     room_thumbnail_url: string;
//     admin_name: string;
//     admin_profile_url: string;
//     participant_count: number;
//   } | null>(null);

//   useEffect(() => {
//     const fetchRoomData = async () => {
//       try {
//         // 채팅방 정보 가져오기
//         const { data: room, error: roomError } = await supabase
//           .from("chat_rooms")
//           .select("room_title, room_thumbnail_url")
//           .eq("room_id", roomId)
//           .single();

//         if (roomError || !room) throw roomError || new Error("채팅방 정보를 찾을 수 없습니다.");

//         // 채팅방 관리자 정보 가져오기
//         const adminResult = await getAdminDetails(roomId);
//         if (!adminResult.success || !adminResult.data) throw new Error(adminResult.error);

//         // 채팅방 참여자 수 가져오기
//         const { data: participants, error: participantsError } = await supabase
//           .from("chat_members")
//           .select("member_id", { count: "exact" })
//           .eq("room_id", roomId);

//         if (participantsError) throw participantsError;

//         // State 업데이트하기
//         setRoomData({
//           room_title: room.room_title,
//           room_thumbnail_url: room.room_thumbnail_url || "",
//           admin_name: adminResult.data.name || "알 수 없는 관리자",
//           admin_profile_url: adminResult.data.profileImageUrl || "",
//           participant_count: participants?.length || 0
//         });
//       } catch (error) {
//         console.error("Error fetching room data:", error);
//       }
//     };

//     fetchRoomData();
//   }, [roomId]);

//   if (!roomData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <header className="flex h-[96px] w-[1200px] items-center justify-between bg-white px-[102px]">
//       <div className="flex items-center gap-3">
//         {/* 채팅방 썸네일 이미지 */}
//         <figure className="relative h-10 w-10 overflow-hidden rounded-full">
//           <Image src={roomData.room_thumbnail_url || sampleImage} alt="Thumbnail" className="object-cover" fill />
//         </figure>

//         {/* 채팅방 정보 */}
//         <div className="flex flex-col">
//           <div className="text-title2 font-bold leading-[27px] text-black">{roomData.room_title}</div>
//           <div className="text-caption font-medium leading-tight text-black">
//             {roomData.participant_count}명이 채팅에 참여 중
//           </div>
//         </div>
//       </div>
//       {/* 채팅방 삭제 버튼 연결해야함 */}
//       <List size={32} />
//     </header>
//   );
// };

// export default ChatHeader;
