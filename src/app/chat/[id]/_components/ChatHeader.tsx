import { useAuthStore } from "@/lib/store/authStore";
import { deleteChatRoom } from "@/lib/utils/chat/chat";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import sampleImage from "@/assets/images/image_sample.png";
import Link from "next/link";
import { CaretLeft, List } from "@phosphor-icons/react";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

const supabase = createClient();

type ChatHeaderProps = {
  roomId: string;
};

const ChatHeader = ({ roomId }: ChatHeaderProps) => {
  const [roomData, setRoomData] = useState<{
    room_title: string;
    room_thumbnail_url: string;
    participant_count: number;
    isAdmin: boolean;
  } | null>(null);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

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
          isAdmin: room.user_id === currentUser?.id
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId, currentUser?.id]);

  const handleDeleteRoom = async () => {
    if (!roomData?.isAdmin) {
      alert("방장만 채팅방을 삭제할 수 있습니다.");
      return;
    }

    if (confirm("정말로 채팅방을 삭제하시겠습니까?")) {
      const result = await deleteChatRoom(currentUser?.id, roomId);
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
    <div className="absolute left-1/2 top-0 flex h-[96px] w-full -translate-x-1/2 items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <CaretLeft size={24} weight="bold" />
        </Link>
        <figure className="relative h-10 w-10 overflow-hidden rounded-full mb:h-6 mb:w-6">
          <Image src={roomData.room_thumbnail_url || sampleImage} alt="Thumbnail" fill />
        </figure>
        <div className="flex flex-col">
          <p className="text-title2 font-bold text-text-04 tb:text-body tb:font-medium">{roomData.room_title}</p>
          <p className="text-caption font-medium text-text-03 tb:text-small tb:font-medium">
            {roomData.participant_count}명
          </p>
        </div>
      </div>

      {/* 버튼: 채팅방 삭제 기능? 방장 전용? */}
      <button>
        <List size={isTabletOrSmaller ? 24 : 32} />
      </button>
    </div>
  );
};

export default ChatHeader;

// div flex h-[96px] items-center justify-between bg-white px-4
