"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface ChatMessagesProps {
  roomId: string;
  currentUserId: string; // 현재 로그인한 사용자의 ID
}

export default function ChatMessages({ roomId, currentUserId }: ChatMessagesProps) {
  const [messages, setMessages] = useState<any[]>([]);

  // Supabase에서 메시지 가져오기
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data || []);
    }
  };

  // Realtime 구독 설정
  useEffect(() => {
    const subscription = supabase
      .channel("realtime:chat_messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    fetchMessages();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId]);

  return (
    <div className="mb-5 flex flex-col">
      <h2 className="text-xl mb-3 font-bold">채팅 메시지</h2>
      <div className="flex flex-col gap-4">
        {messages.map((message) => {
          const isSender = message.member_id === currentUserId;

          return (
            <div
              key={message.message_id}
              className={`flex ${isSender ? "justify-end" : "justify-start"} items-start gap-2`}
            >
              {/* 왼쪽: 프로필 이미지 (수신자만 표시) */}
              {!isSender && <div className="h-10 w-10 rounded-full bg-gray-300"></div>}

              {/* 중앙: 메시지 내용 */}
              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[60%]`}>
                {/* 이름 (수신자만 표시) */}
                {!isSender && (
                  <span className="text-sm mb-1 font-bold text-gray-600">
                    {message.member_name || message.member_id}
                  </span>
                )}

                {/* 메시지 박스와 작성 시간 */}
                <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-center gap-2`}>
                  {/* 메시지 박스 */}
                  <div className={`rounded-lg p-3 shadow-sm ${isSender ? "bg-green-100" : "bg-gray-200"} break-words`}>
                    {message.content && <p className="m-0">{message.content}</p>}
                    {message.image_url && (
                      <img
                        src={`${supabase.storage.from("chat-images").getPublicUrl(message.image_url).data.publicUrl}`}
                        alt="첨부 이미지"
                        className="mt-2 max-w-full rounded-lg"
                      />
                    )}
                  </div>

                  {/* 작성 시간 */}
                  <span className="text-xs mb-1 self-end text-gray-500">
                    {new Date(message.created_at).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Todo: next image 로 바꾸기
