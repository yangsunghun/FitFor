"use client";

import React from "react";

export default function ChatRoomLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

// 헤더: 호스트 프로필, 채팅방 타이틀, 현재 참여 중인 멤버 수