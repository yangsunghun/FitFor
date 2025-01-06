"use client";
import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import ChatList from "@/components/chat/ChatList";

interface ChatRoom {
  id: string;
  title: string;
  image_file: string | null;
  created_at: string;
  room_leader: string;
}

export default function ChatRoomList() {
  const supabase = createClient();
  const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
  const [newRoomTitle, setNewRoomTitle] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 채팅방 목록 불러오기
  const fetchChatRooms = async () => {
    const { data } = await supabase
      .from("chatrooms")
      .select("id, title, image_file, room_leader, created_at")
      .order("created_at", { ascending: false });
    
    if (data) {
      setChatrooms(data);
    }
  };

  // 초기 로드
  useState(() => {
    fetchChatRooms();
  });

// 이미지 업로드 및 채팅방 생성
const handleCreateRoom = async () => {
    if (!newRoomTitle) return;
  
    let imageUrl = null;
  
    if (imageFile) {
      // 스토리지에 이미지 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("chat-images")  // Supabase 스토리지 버킷 이름
        .upload(`rooms/${Date.now()}_${imageFile.name}`, imageFile);
  
      if (uploadError) {
        console.error("이미지 업로드 실패:", uploadError);
        return;
      }
  
      // 업로드한 이미지의 URL 가져오기
      const { data } = supabase.storage
        .from("chat-images")
        .getPublicUrl(uploadData.path);
  
      imageUrl = data.publicUrl || "/images/default_room.png";  // URL 사용
    } else {
      imageUrl = "/images/default_room.png";  // 기본 이미지 경로
    }
  
    // 채팅방 생성
    const { data, error } = await supabase
      .from("chatrooms")
      .insert([{
        title: newRoomTitle,
        room_leader: "156813e0-f3ec-4a55-bd94-9f3a55d84cfd",
        image_file: imageUrl
      }])
      .select();
  
    if (data) {
      setChatrooms([data[0], ...chatrooms]);
      setNewRoomTitle("");
      setImageFile(null);  // 파일 초기화
    } else {
      console.error("채팅방 생성 실패:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-[1200px] mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">채팅방 목록</h1>
        
        {/* 채팅방 추가 폼 */}
        <div className="flex flex-col gap-4 mb-10">
          <input
            type="text"
            placeholder="새 채팅방 이름"
            value={newRoomTitle}
            onChange={(e) => setNewRoomTitle(e.target.value)}
            className="border p-3 rounded-lg w-96 bg-white text-black"
          />
          
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            className="border p-3 rounded-lg w-96 bg-white text-black"
          />

          <button
            onClick={handleCreateRoom}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            채팅방 추가
          </button>
        </div>

        {/* 채팅방 목록 렌더링 */}
        <ChatList chatrooms={chatrooms} />
      </div>
    </main>
  );
}