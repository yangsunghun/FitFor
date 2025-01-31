import ChatHeader from "./ChatHeader";
import ChatTabs from "./ChatTabs";

type ChatRoomProps = {
  roomId: string;
};

const ChatRoom = ({ roomId }: ChatRoomProps) => {
  return (
    <>
      <ChatHeader roomId={roomId} />
      <ChatTabs roomId={roomId} />
    </>
  );
};

export default ChatRoom;

// h-[calc(100vh-80px)]
