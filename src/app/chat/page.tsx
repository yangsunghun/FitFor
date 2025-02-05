export const dynamic = "force-dynamic";

import ChatRoomList from "./_components/ChatRoomList";

const ChatRoomListPage = () => {
  return (
    <div className="inner relative pb-40 pt-10 tb:pb-10 tb:pt-4">
      <h2 className="mb-10 p-2 text-title1 font-bold text-text-04 mb:mb-0 mb:text-title2">코칭</h2>
      <ChatRoomList />
    </div>
  );
};

export default ChatRoomListPage;