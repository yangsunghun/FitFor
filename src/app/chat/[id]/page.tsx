"use client";

// 채팅방 id에 따라 각 채팅방이 동적으로 라우팅되는 페이지입니다.

import { useState } from "react";
import ChatInput from "./_components/ChatInput";
import ChatMessages from "./_components/ChatMessages";
import { exitChatRoom } from "../_utils/chat";
import { useAuthStore } from "@/lib/store/authStore";
// 퇴장 함수 import

interface ChatRoomPageProps {
  params: { id: string }; // App Router에서 제공하는 동적 경로 파라미터
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id: roomId } = params;
  const currentUser = useAuthStore((state) => state.user);
  // const memberId = "eeebe519-c2b1-4f55-ad15-757334452a2b"; // 실제 로그인된 사용자 ID로 변경 필요

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExitChatRoom = async () => {
    if (!currentUser) {
      setError("로그인 상태를 확인해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, error } = await exitChatRoom(currentUser.id, roomId);

      if (!success) {
        throw new Error(error);
      }

      // 채팅방 퇴장 성공 시 로직 (예: 페이지 리디렉션)
      alert("채팅방에서 퇴장했습니다.");
      window.location.href = "/"; // 홈으로 이동
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>채팅방</h1>
      {currentUser ? (
        <>
          <ChatMessages roomId={roomId} />
          <ChatInput roomId={roomId} memberId={currentUser.id} />
        </>
      ) : (
        <p>로그인 후에 메시지를 입력할 수 있습니다.</p>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleExitChatRoom}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Leaving..." : "Leave Chat Room"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}

// "use client";

// import { Database } from "@/lib/types/supabase";
// import { createClient } from "@/lib/utils/supabase/client";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// type Message = Database["public"]["Tables"]["chat_room_messages"]["Row"];

// interface ChatPageProps {
//   params: { id: string };
// }

// const supabase = createClient();

// const fetchMessages = async (chatRoomId: string) => {
//   const { data: messages, error } = await supabase
//     .from("chat_room_messages")
//     .select("*")
//     .eq("room_id", chatRoomId)
//     .order("created_at", { ascending: true });

//   if (error) {
//     console.error("Failed to fetch messages:", error);
//     throw new Error("Failed to fetch messages");
//   }

//   return messages || [];
// };

// const ChatPage = ({ params }: ChatPageProps) => {
//   const chatRoomId = params.id;
//   const queryClient = useQueryClient();
//   const [newMessage, setNewMessage] = useState<string>("");

//   // 메시지 데이터 가져오기
//   const {
//     data: messages = [],
//     isLoading,
//     error
//   } = useQuery({
//     queryKey: ["messages", chatRoomId],
//     queryFn: () => fetchMessages(chatRoomId),
//     enabled: !!chatRoomId,
//     staleTime: 0,
//     refetchOnWindowFocus: true
//   });

//   // 메시지 전송
//   const sendMessageMutation = useMutation({
//     mutationFn: async (content: string) => {
//       const { error } = await supabase
//         .from("chat_room_messages")
//         .insert({ content, room_id: chatRoomId, user_id: "95fb7522-36c1-46cc-83e5-86ec575ba745" });

//       if (error) {
//         console.error("Failed to send message:", error);
//         throw new Error("Failed to send message");
//       }
//     },
//     onSuccess: () => {
//       setNewMessage("");
//       queryClient.invalidateQueries({
//         queryKey: ["messages", chatRoomId] as const // 명시적 타입 지정
//       });
//     }
//   });

//   // supabase 채널 구독 설정
//   useEffect(() => {
//     if (!chatRoomId) return;

//     const channel = supabase
//       .channel(`messages:chatroom_id=eq.${chatRoomId}`)
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${chatRoomId}` },
//         (payload) => {
//           const newMessage = payload.new as Message;
//           queryClient.setQueryData(["messages", chatRoomId], (old: Message[] | undefined) => [
//             ...(old || []),
//             newMessage
//           ]);
//         }
//       )
//       .subscribe();

//     // 컴포넌트 언마운트 시 구독 해제
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [chatRoomId, queryClient]);

//   // 메시지 전송 핸들러
//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
//     sendMessageMutation.mutate(newMessage);
//   };

//   if (isLoading) return <div>Loading messages...</div>;
//   if (error) return <div>Error loading messages</div>;

//   return (
//     <div className="mx-auto max-w-[1200px] bg-white py-10 text-black">
//       <h1 className="mb-6 text-3xl font-bold">채팅방</h1>
//       <div className="rounded-md border bg-white p-6 shadow-md">
//         {messages?.map((msg) => (
//           <div key={msg.id} className="mb-4">
//             <p className="text-lg">{msg.content}</p>
//             <span className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>

//       {/* 메시지 입력 폼 */}
//       <div className="mt-6 flex items-center gap-4">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="메시지를 입력하세요"
//           className="w-full rounded-lg border bg-white p-3 text-black"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
//         >
//           보내기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// "use client";

// import { Database } from "@/lib/types/supabase";
// import { createClient } from "@/lib/utils/supabase/client";
// import { useQuery } from "@tanstack/react-query";
// import { notFound } from "next/navigation";
// import { useEffect, useState } from "react";

// type Message = Database["public"]["Tables"]["messages"]["Row"];

// interface ChatPageProps {
//   params: { id: string };
// }

// const ChatPage = ({ params }: ChatPageProps) => {
//   const supabase = createClient();
//   const chatRoomId = params.id;
//   // const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");

//   export const fetchMessages = async (chatRoomId: string) => {
//     const { data: messages, error } = await supabase
//       .from("messages")
//       .select("*")
//       .eq("room_id", chatRoomId)
//       .order("created_at", { ascending: true })

//     if (error) {
//       console.error("메시지를 가져오지 못했습니다:", error);
//       throw new Error("메시지 가져오기 실패")

//       return messages || []
//     }
//     }
//   }

//   const { data, isLoading } = useQuery({
//     queryKey: ["messages"],
//     queryFn:
//   })

//   // 채팅방 정보 조회
//   useEffect(() => {
//     const fetchChatRoomInfo = async () => {
//       const { data: chatRoomInfo } = await supabase.from("chatrooms").select("*").eq("id", chatRoomId).single();

//       if (!chatRoomInfo) {
//         return notFound();
//       }

//       // 채팅방 메시지 조회
//       const { data: messages } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("room_id", chatRoomId)
//         .order("created_at", { ascending: true });

//       setMessages(messages || []);

//       // 실시간 구독
//       const channel = supabase
//         .channel(`messages:chatroom_id=eq.${chatRoomId}`)
//         .on(
//           "postgres_changes",
//           { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${chatRoomId}` },
//           (payload) => {
//             const newMessage = payload.new as Message;
//             setMessages((prev) => [...prev, newMessage]);
//           }
//         )
//         .subscribe();

//       return () => {
//         supabase.removeChannel(channel);
//       };
//     };
//     fetchChatRoomInfo();
//   }, [supabase, chatRoomId]);

//   // 메시지 전송
//   const handleSendMessage = async () => {
//     if (!newMessage) return;

//     const { error } = await supabase
//       .from("messages")
//       .insert({ content: newMessage, room_id: chatRoomId, user_id: "95fb7522-36c1-46cc-83e5-86ec575ba745" })
//       .select();

//     if (error) {
//       console.error("메시지 전송 실패:", error);
//     } else {
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="mx-auto max-w-[1200px] bg-white py-10 text-black">
//       <h1 className="mb-6 text-3xl font-bold">채팅방</h1>
//       <div className="rounded-md border bg-white p-6 shadow-md">
//         {messages?.map((msg) => (
//           <div key={msg.id} className="mb-4">
//             <p className="text-lg">{msg.content}</p>
//             <span className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
//           </div>
//         ))}
//       </div>

//       {/* 메시지 입력 폼 */}
//       <div className="mt-6 flex items-center gap-4">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="메시지를 입력하세요"
//           className="w-full rounded-lg border bg-white p-3 text-black"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
//         >
//           보내기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

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
