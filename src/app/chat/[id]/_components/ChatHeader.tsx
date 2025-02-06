import { useAuthStore } from "@/lib/store/authStore";
import { deleteChatRoom } from "@/lib/utils/chat/chat";
import { createClient } from "@/lib/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CaretLeft, List } from "@phosphor-icons/react";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import ProfileImageCircle from "@/components/shared/ProfileImageCircle";
import Dropdown from "@/components/ui/Dropdown";

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
    return <div></div>
  }

  return (
    <div className="absolute left-1/2 top-0 z-20 flex h-[96px] w-full -translate-x-1/2 items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <CaretLeft size={24} weight="bold" />
        </Link>
        <figure className="relative flex-shrink-0">
          <ProfileImageCircle
            profileImage={roomData.room_thumbnail_url}
            size={40}
            className="h-10 w-10 mb:h-6 mb:w-6"
          />
        </figure>
        <div className="flex flex-col mb:w-[180px]">
          <p className="text-title2 font-bold text-text-04 tb:text-body tb:font-medium mb:truncate">
            {roomData.room_title}
          </p>
          <p className="text-caption font-medium text-text-03 tb:text-small tb:font-medium">
            {roomData.participant_count}명
          </p>
        </div>
      </div>

      {roomData.isAdmin && (
        <Dropdown trigger={<List size={isTabletOrSmaller ? 24 : 32} />} useMobileUI={false}>
          <ul>
            <li className="w-full whitespace-nowrap text-left font-medium transition duration-300 hover:text-primary-default mb:text-caption">
              <button onClick={handleDeleteRoom}>채팅방 삭제하기</button>
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
};

export default ChatHeader;