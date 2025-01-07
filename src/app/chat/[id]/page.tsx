"use client";

import { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Message = Database["public"]["Tables"]["messages"]["Row"];

interface ChatPageProps {
  params: { id: string };
}

const ChatPage = ({ params }: ChatPageProps) => {
  const supabase = createClient();
  const chatRoomId = params.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // 채팅방 정보 조회
  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      const { data: chatRoomInfo } = await supabase.from("chatrooms").select("*").eq("id", chatRoomId).single();

      if (!chatRoomInfo) {
        return notFound();
      }

      // 채팅방 메시지 조회
      const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", chatRoomId)
        .order("created_at", { ascending: true });

      setMessages(messages || []);

      // 실시간 구독
      const channel = supabase
        .channel(`messages:chatroom_id=eq.${chatRoomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${chatRoomId}` },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) =>
              [...prev, newMessage].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            );
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };
    fetchChatRoomInfo();
  }, [supabase, chatRoomId]);

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!newMessage) return;

    const { error } = await supabase
      .from("messages")
      .insert({ content: newMessage, room_id: chatRoomId, user_id: "95fb7522-36c1-46cc-83e5-86ec575ba745" })
      .select();

    if (error) {
      console.error("메시지 전송 실패:", error);
    } else {
      setNewMessage("");
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] bg-white py-10 text-black">
      <h1 className="mb-6 text-3xl font-bold">채팅방</h1>
      <div className="rounded-md border bg-white p-6 shadow-md">
        {messages?.map((msg) => (
          <div key={msg.id} className="mb-4">
            <p className="text-lg">{msg.content}</p>
            <span className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      {/* 메시지 입력 폼 */}
      <div className="mt-6 flex items-center gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="w-full rounded-lg border bg-white p-3 text-black"
        />
        <button
          onClick={handleSendMessage}
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          보내기
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

// 'use client'
// import { createClient } from "@/lib/utils/supabase/client";
// import { notFound } from "next/navigation";
// import { useState } from "react";

// interface Message {
//   id: string;
//   content: string;
//   created_at: string;
//   user_id: string;
// }

// interface ChatRoomProps {
//   params: { id: string };
// }

// export default function ChatRoom({ params }: ChatRoomProps) {
//   const supabase = createClient();
//   const roomId = params.id;
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   // 채팅방 정보 조회
//   const fetchChatRoom = async () => {
//     const { data: room } = await supabase
//       .from("chatrooms")
//       .select("id, title, image_file, room_leader, created_at")
//       .eq("id", roomId)
//       .single();

//     if (!room) {
//       return notFound();
//     }

//     // 메시지 불러오기
//     const { data: messages } = await supabase
//       .from("messages")
//       .select("*")
//       .eq("room_id", roomId)
//       .order("created_at", { ascending: true });

//     setMessages(messages || []);
//   };

//   // 초기 데이터 로드
//   useState(() => {
//     fetchChatRoom();
//   });

//   // 메시지 전송 핸들러
//   const handleSendMessage = async () => {
//     if (!newMessage) return;

//     const { data, error } = await supabase
//       .from("messages")
//       .insert([{ content: newMessage, room_id: roomId, user_id: "b9e753ea-1b67-43f3-a6a1-41d93ef1ca0c" }])  // user_id는 임시로 설정
//       .select();

//     if (data) {
//       setMessages([...messages, data[0]]);
//       setNewMessage("");  // 입력 필드 초기화
//     } else {
//       console.error("메시지 전송 실패:", error);
//     }
//   };

//   return (
// <div className="max-w-[1200px] mx-auto py-10 bg-white text-black">
//   <h1 className="text-3xl font-bold mb-6">채팅방</h1>
//   <div className="border rounded-md p-6 bg-white shadow-md">
//     {messages?.map((msg) => (
//       <div key={msg.id} className="mb-4">
//         <p className="text-lg">{msg.content}</p>
//         <span className="text-sm text-gray-500">
//           {new Date(msg.created_at).toLocaleTimeString()}
//         </span>
//       </div>
//     ))}
//   </div>

//   {/* 메시지 입력 폼 */}
//   <div className="mt-6 flex items-center gap-4">
//     <input
//       type="text"
//       value={newMessage}
//       onChange={(e) => setNewMessage(e.target.value)}
//       placeholder="메시지를 입력하세요"
//       className="border rounded-lg w-full p-3 bg-white text-black"
//     />
//     <button
//       onClick={handleSendMessage}
//       className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
//     >
//       보내기
//     </button>
//   </div>
// </div>
//   );
// }
