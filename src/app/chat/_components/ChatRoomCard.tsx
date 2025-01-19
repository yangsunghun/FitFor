import { Tags } from "@/components/ui/Tags";
import { ChatRoomType } from "@/lib/types/chat";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  chatRoom: ChatRoomType;
};

const ChatRoomCard = ({ chatRoom }: Props) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/chat/${chatRoom.room_id}`);
  };

  return (
    <div className="flex w-[190px] cursor-pointer flex-col gap-3" onClick={handleCardClick}>
      {/* 썸네일 */}
      <figure className="relative h-[252px] w-full overflow-hidden rounded-2xl shadow-md">
        <Image
          src={chatRoom.room_thumbnail_url || "https://via.placeholder.com/190x252"}
          alt={`${chatRoom.room_title}'s thumbnail`}
          fill
          className="object-cover transition duration-300 hover:brightness-75"
        />
        {/* 채팅방 참여자 수 */}
        <figcaption className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1">
          <span className="text-xs rounded-full">🔴</span>
          <span className="text-caption font-medium text-text-01">{chatRoom.participantCount}명</span>
        </figcaption>
      </figure>

      {/* 채팅방 정보 */}
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={chatRoom.user.profile_image || "/default-profile.png"}
            alt={`${chatRoom.user.nickname}'s profile`}
            width={30}
            height={30}
            className="rounded-full border border-gray-300 bg-white"
          />
          <span className="text-sm font-medium text-gray-800">{chatRoom.user.nickname}</span>
        </div>
        <h3 className="text-sm line-clamp-2 font-semibold text-black">
          {chatRoom.room_title || "채팅방 제목이 없습니다."}
        </h3>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-1">
        {chatRoom.room_tags?.map((tag, index) => <Tags key={index} label={tag} variant="grayLine" size="sm" />)}
      </div>
    </div>
  );
};

export default ChatRoomCard;
