import sampleImage from "@/assets/images/image_sample.png";
import { Tags } from "@/components/ui/Tags";
import { useAuthStore } from "@/lib/store/authStore";
import { ChatRoomType } from "@/lib/types/chat";
import { enterAsMember } from "@/lib/utils/chat/chat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  chatRoom: ChatRoomType;
};

const ChatRoomCard = ({ chatRoom }: Props) => {
  const currentUser = useAuthStore((state) => state.user);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCardClick = async () => {
    if (!currentUser || !currentUser.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const result = await enterAsMember(currentUser.id, chatRoom.room_id);

      if (result.success) {
        router.push(`/chat/${chatRoom.room_id}`);
      } else {
        console.error(result.error || "채팅방 입장 중 문제가 발생했습니다.");
        alert("채팅방 입장 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("채팅방 입장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex cursor-pointer flex-col" onClick={handleCardClick}>
      {/* 채팅방 썸네일 */}
      <figure className="relative mb-4 h-[15.75rem] w-full overflow-hidden rounded-2xl bg-gray-300">
        <Image
          src={chatRoom.room_thumbnail_url || sampleImage}
          alt={chatRoom.room_title}
          fill
          className="object-cover"
        />
        <figcaption className="absolute left-3 top-3 rounded bg-black-900 px-1">
          <span className="text-caption font-medium text-text-01">🔴{chatRoom.participantCount}명</span>
        </figcaption>
      </figure>

      {/* 채팅방 정보 */}
      <div className="flex">
        <figure className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-300">
          <Image
            src={chatRoom.user.profile_image || sampleImage}
            alt={`${chatRoom.user.nickname || "익명"}의 프로필 이미지`}
            fill
          />
        </figure>
        <h3 className="ml-2 text-body font-medium leading-5">{chatRoom.room_title}</h3>
      </div>
      <div className="ml-10 mt-1 flex flex-col">
        <h4 className="text-caption font-medium text-text-03">{chatRoom.user.nickname}</h4>
        <div className="mt-1 flex flex-wrap gap-1">
          {chatRoom.room_tags?.map((tag, index) => <Tags key={index} label={tag} variant="grayLine" size="sm" />)}
        </div>
      </div>
    </div>
  );
};
export default ChatRoomCard;
