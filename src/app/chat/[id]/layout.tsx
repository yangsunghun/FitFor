"use client";

import React from "react";
import ChatHeader from "./_components/ChatHeader";
import { useAuthStore } from "@/lib/store/authStore";

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
    <div className="flex flex-col items-center">
      {/* 헤더 컴포넌트 */}
      <ChatHeader currentUserId={currentUser.id} roomId={roomId} />

      {/* 채팅방 콘텐츠 */}
      <section className="w-full max-w-[1200px]">{children}</section>
    </div>
  );
};

export default ChatRoomLayout;
