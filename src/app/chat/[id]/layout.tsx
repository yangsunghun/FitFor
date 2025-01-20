"use client";

import { useAuthStore } from "@/lib/store/authStore";
import React from "react";
import ChatHeader from "./_components/ChatHeader";

interface ChatRoomLayoutProps {
  children: React.ReactNode;
  params: { id: string }; // `id`로 수정
}

const ChatRoomLayout = ({ children, params }: ChatRoomLayoutProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const { id: roomId } = params; // Dynamic route parameter

  if (!currentUser) {
    return <div className="text-center text-gray-500">로그인이 필요합니다. 로그인 후 다시 시도해주세요.</div>;
  }

  if (!roomId) {
    return <div>유효하지 않은 채팅방입니다.</div>;
  }

  return (
    <div className="h-fit max-w-[1200px]">
      <div className="inner relative h-[calc(100vh-6rem)]">
        {/* 헤더 컴포넌트 */}
        <ChatHeader currentUserId={currentUser.id} roomId={roomId} />

        {/* 채팅방 콘텐츠 */}
        <section className="absolute bottom-0 h-full w-full">{children}</section>
      </div>
    </div>
  );
};

export default ChatRoomLayout;
