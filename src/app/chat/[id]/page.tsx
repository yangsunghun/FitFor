"use client";

import { useAuthStore } from "@/lib/store/authStore";
import ChatRoom from "./_components/ChatRoom";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { useEffect } from "react";
import { useHeaderStore } from "@/lib/store/useHeaderStore";

type ChatRoomPageProps = {
  params: { id: string };
};

const ChatRoomPage = ({ params }: ChatRoomPageProps) => {
  const { id: roomId } = params; // URL의 [id]값
  const currentUser = useAuthStore((state) => state.user); // 현재 로그인한 사용자 정보

  const { hideNavBar, showNavBar } = useNavBarStore();
  const { hideHeader, showHeader } = useHeaderStore();

  useEffect(() => {
    hideNavBar();
    return () => showNavBar();
  }, [hideNavBar, showNavBar]);

  useEffect(() => {
    hideHeader();
    return () => showHeader();
  }, [hideHeader, showHeader]);

  if (!currentUser) {
    return <p>로그인이 필요합니다. 로그인 후 다시 시도하세요.</p>;
  }

  return (
    <div>
      <ChatRoom roomId={roomId} />
    </div>
  );
};

export default ChatRoomPage;
