"use client";

import { createClient } from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { enterAsMember } from "./_utils/chat";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

const supabase = createClient();

export default function ChatRoomListPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);

  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  const fetchChatRooms = async () => {
    const { data, error } = await supabase.from("chat_rooms").select(`
      room_id,
      room_title,
      room_thumbnail_url
    `);

    return { chatRooms: data || [], error };
  };

  useEffect(() => {
    fetchChatRooms()
      .then(({ chatRooms, error }) => {
        if (error) setError("채팅방 정보를 가져오는 데 실패했습니다.");
        else setChatRooms(chatRooms);
      })
      .catch(() => setError("데이터를 가져오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false)); // 로딩 상태 종료
  }, []);

  const handleRoomClick = (roomId: string) => {
    enterRoom(roomId);
  };

  const enterRoom = async (roomId: string) => {
    if (!currentUser || !currentUser.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const result = await enterAsMember(currentUser.id, roomId);

      if (!result.success) {
        alert(`채팅방 입장 실패: ${result.error}`);
        return;
      }

      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("채팅방 입장 중 에러 발생:", error);
      alert("알 수 없는 에러가 발생했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>채팅방 리스트</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {chatRooms.map((room) => (
          <li
            key={room.room_id}
            onClick={() => handleRoomClick(room.room_id)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Image
              src={room.room_thumbnail_url || "https://via.placeholder.com/100"}
              alt={room.room_title}
              width={100}
              height={100}
            />
            <div style={{ marginLeft: "10px" }}>
              <h3 style={{ margin: 0 }}>{room.room_title}</h3>
              <p style={{ margin: 0, color: "#555" }}>{room.room_subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 채팅방 생성 페이지로 이동하는 플로팅 버튼입니다.