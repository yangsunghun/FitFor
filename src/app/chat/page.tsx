"use client";

import ChatList from "@/components/chat/ChatList";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@/lib/utils/supabase/client";
import { useEffect, useState } from "react";

type ChatRoom = Database["public"]["Tables"]["chatrooms"]["Row"];

const ChatRoomList = () => {
  const supabase = createClient();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [chatRoomTitle, setChatRoomTitle] = useState<string>("");

  // 채팅방 목록 조회
  useEffect(() => {
    const fetchChatRooms = async () => {
      const { data } = await supabase.from("chatrooms").select("*").order("created_at", { ascending: false });

      if (data) {
        setChatRooms(data);
      }
    };
    fetchChatRooms();
  }, [supabase]);

  // 채팅방 생성(thumbnail 이미지 업로드 로직 제외: 이후에 수정 필요)
  const handleCreatRoom = async () => {
    if (!chatRoomTitle) return;

    const { data, error } = await supabase
      .from("chatrooms")
      .insert([
        {
          title: chatRoomTitle,
          room_leader: "95fb7522-36c1-46cc-83e5-86ec575ba745", // email: user1@example.com / id: user1 / pw: 123123
          image_url:
            "https://czcbonajmenirmxdslhj.supabase.co/storage/v1/object/public/chat-images/rooms/1736160798087_error.png" // 일단 딩코 넣어둠!!
        }
      ])
      .select();

    if (data) {
      setChatRooms([data[0], ...chatRooms]);
      setChatRoomTitle("");
    } else {
      console.error("채팅방 생성 실패:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1200px] py-10">
        <h1 className="mb-8 text-3xl font-bold">채팅방 목록</h1>

        {/* 채팅방 추가 폼 */}
        <div className="mb-10 flex flex-col gap-4">
          <input
            type="text"
            placeholder="새 채팅방 이름"
            value={chatRoomTitle}
            onChange={(e) => setChatRoomTitle(e.target.value)}
            className="w-96 rounded-lg border bg-white p-3 text-black"
          />

          {/* <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            className="w-96 rounded-lg border bg-white p-3 text-black"
          /> */}

          <button
            onClick={handleCreatRoom}
            className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            채팅방 추가
          </button>
        </div>

        {/* 채팅방 목록 렌더링 */}
        <ChatList chatrooms={chatRooms} />
      </div>
    </main>
  );
};

export default ChatRoomList;

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
