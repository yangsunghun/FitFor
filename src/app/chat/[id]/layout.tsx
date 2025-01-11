"use client";

import React from "react";
import ChatHeader from "./_components/ChatHeader";

interface ChatRoomLayoutProps {
  children: React.ReactNode;
  params: { id: string }; // `id`로 수정 (Next.js 13 dynamic routes standard)
}

const ChatRoomLayout = ({ children, params }: ChatRoomLayoutProps) => {
  const { id: roomId } = params; // Dynamic route parameter

  if (!roomId) {
    return <div>유효하지 않은 채팅방입니다. (roomId가 없습니다)</div>;
  }

  return (
    <main className="flex flex-col items-center">
      {/* 헤더 컴포넌트 */}
      <ChatHeader roomId={roomId} />

      {/* 채팅방 콘텐츠 */}
      <section className="mt-4 w-full max-w-[1200px]">{children}</section>
    </main>
  );
};

export default ChatRoomLayout;