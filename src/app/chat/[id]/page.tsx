"use client";

import { useAuthStore } from "@/lib/store/authStore";
import ChatGallery from "./_components/ChatGallery";
import ChatInput from "./_components/ChatInput";
import ChatMessages from "./_components/ChatMessages";
import Tabs from "./_components/ChatTabs";

interface ChatRoomPageProps {
  params: { id: string };
}

const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  const { id: roomId } = params;
  const currentUser = useAuthStore((state) => state.user);

  return (
    <div className="">
      {/* Tabs */}
      <ul>
        {currentUser ? (
          <Tabs labels={["채팅", "갤러리"]}>
            {/* 탭 1: 채팅 */}
            <li>
              <ChatMessages roomId={roomId} currentUserId={currentUser.id} />
              <ChatInput roomId={roomId} memberId={currentUser.id} />
            </li>
            {/* 탭 2: 갤러리 */}
            <li className="py-6">
              <ChatGallery roomId={roomId} />
            </li>
          </Tabs>
        ) : (
          <p className="text-center text-gray-500">로그인 후에 메시지를 입력할 수 있습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default ChatRoomPage;