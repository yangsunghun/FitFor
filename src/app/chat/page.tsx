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
      room_subtitle,
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

// "use client";

// import type { Database } from "@/lib/types/supabase";
// import { createClient } from "@/lib/utils/supabase/client";
// import { useEffect, useState } from "react";
// import ChatRoomCard from "./_components/ChatRoomCard";

// type ChatRoom = Database["public"]["Tables"]["chat_rooms"]["Row"];

// const ChatRoomListPage = () => {
//   const supabase = createClient();
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

//   // 채팅방 목록 조회

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       const { data } = await supabase.from("chat_rooms").select("*").order("created_at", { ascending: false });

//       if (data) {
//         setChatRooms(data);
//       }
//     };
//     fetchChatRooms();
//   }, [supabase]);

//   return (
//     <div>
//       <ChatRoomCard chatrooms={chatRooms} />
//     </div>
//   );
// };

// export default ChatRoomListPage;

// "use client";

// import ChatList from "@/components/chat/ChatList";
// import { Database } from "@/lib/types/supabase";
// import { createClient } from "@/lib/utils/supabase/client";
// import { useEffect, useState } from "react";

// type ChatRoom = Database["public"]["Tables"]["chatrooms"]["Row"];

// const ChatRoomList = () => {
//   const supabase = createClient();
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const [chatRoomTitle, setChatRoomTitle] = useState<string>("");

//   // 채팅방 목록 조회
//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       const { data } = await supabase.from("chatrooms").select("*").order("created_at", { ascending: false });

//       if (data) {
//         setChatRooms(data);
//       }
//     };
//     fetchChatRooms();
//   }, [supabase]);

//   // 채팅방 생성(thumbnail 이미지 업로드 로직 제외: 이후에 수정 필요)
//   const handleCreatRoom = async () => {
//     if (!chatRoomTitle) return;

//     const { data, error } = await supabase
//       .from("chatrooms")
//       .insert([
//         {
//           title: chatRoomTitle,
//           room_leader: "95fb7522-36c1-46cc-83e5-86ec575ba745", // email: user1@example.com / id: user1 / pw: 123123
//           image_url:
//             "https://czcbonajmenirmxdslhj.supabase.co/storage/v1/object/public/chat-images/rooms/1736160798087_error.png" // 일단 딩코 넣어둠!!
//         }
//       ])
//       .select();

//     if (data) {
//       setChatRooms([data[0], ...chatRooms]);
//       setChatRoomTitle("");
//     } else {
//       console.error("채팅방 생성 실패:", error);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-white text-black">
//       <div className="mx-auto max-w-[1200px] py-10">
//         <h1 className="mb-8 text-3xl font-bold">채팅방 목록</h1>

//         {/* 채팅방 추가 폼 */}
//         <div className="mb-10 flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="새 채팅방 이름"
//             value={chatRoomTitle}
//             onChange={(e) => setChatRoomTitle(e.target.value)}
//             className="w-96 rounded-lg border bg-white p-3 text-black"
//           />

//           {/* <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setImageFile(file);
//             }}
//             className="w-96 rounded-lg border bg-white p-3 text-black"
//           /> */}

//           <button
//             onClick={handleCreatRoom}
//             className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
//           >
//             채팅방 추가
//           </button>
//         </div>

//         {/* 채팅방 목록 렌더링 */}
//         <ChatList chatrooms={chatRooms} />
//       </div>
//     </main>
//   );
// };

// export default ChatRoomList;

// "use client";
// import { useState } from "react";
// import { createClient } from "@/lib/utils/supabase/client";
// import ChatList from "@/components/chat/ChatList";

// interface ChatRoom {
//   id: string;
//   title: string;
//   image_file: string | null;
//   created_at: string;
//   room_leader: string;
// }

// export default function ChatRoomList() {
//   const supabase = createClient();
//   const [chatrooms, setChatrooms] = useState<ChatRoom[]>([]);
//   const [newRoomTitle, setNewRoomTitle] = useState<string>("");
// const [imageFile, setImageFile] = useState<File | null>(null);

//   // 채팅방 목록 불러오기
//   const fetchChatRooms = async () => {
//     const { data } = await supabase
//       .from("chatrooms")
//       .select("id, title, image_file, room_leader, created_at")
//       .order("created_at", { ascending: false });

//     if (data) {
//       setChatrooms(data);
//     }
//   };

//   // 초기 로드
//   useState(() => {
//     fetchChatRooms();
//   });

//   // 이미지 업로드 및 채팅방 생성
//   const handleCreateRoom = async () => {
//     if (!newRoomTitle) return;

//     let imageUrl = null;

//     if (imageFile) {
//       // 스토리지에 이미지 업로드
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("chat-images") // Supabase 스토리지 버킷 이름
//         .upload(`rooms/${Date.now()}_${imageFile.name}`, imageFile);

//       if (uploadError) {
//         console.error("이미지 업로드 실패:", uploadError);
//         return;
//       }

//       // 업로드한 이미지의 URL 가져오기
//       const { data } = supabase.storage.from("chat-images").getPublicUrl(uploadData.path);

//       imageUrl = data.publicUrl || "/images/default_room.png"; // URL 사용
//     } else {
//       imageUrl = "/images/default_room.png"; // 기본 이미지 경로
//     }

//     // 채팅방 생성
//     const { data, error } = await supabase
//       .from("chatrooms")
//       .insert([
//         {
//           title: newRoomTitle,
//           room_leader: "156813e0-f3ec-4a55-bd94-9f3a55d84cfd",
//           image_file: imageUrl
//         }
//       ])
//       .select();

//     if (data) {
//       setChatrooms([data[0], ...chatrooms]);
//       setNewRoomTitle("");
//       setImageFile(null); // 파일 초기화
//     } else {
//       console.error("채팅방 생성 실패:", error);
//     }
//   };

//   return (
// <main className="min-h-screen bg-white text-black">
//   <div className="mx-auto max-w-[1200px] py-10">
//     <h1 className="mb-8 text-3xl font-bold">채팅방 목록</h1>

//     {/* 채팅방 추가 폼 */}
//     <div className="mb-10 flex flex-col gap-4">
//       <input
//         type="text"
//         placeholder="새 채팅방 이름"
//         value={newRoomTitle}
//         onChange={(e) => setNewRoomTitle(e.target.value)}
//         className="w-96 rounded-lg border bg-white p-3 text-black"
//       />

//       <input
//         type="file"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) setImageFile(file);
//         }}
//         className="w-96 rounded-lg border bg-white p-3 text-black"
//       />

//       <button
//         onClick={handleCreateRoom}
//         className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
//       >
//         채팅방 추가
//       </button>
//     </div>

//     {/* 채팅방 목록 렌더링 */}
//     <ChatList chatrooms={chatrooms} />
//   </div>
// </main>
//   );
// }
