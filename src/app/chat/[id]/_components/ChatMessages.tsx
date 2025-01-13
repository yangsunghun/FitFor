"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";

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
    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
      <h2>채팅 메시지</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((message) => {
          const isSender = message.member_id === currentUserId;

          return (
            <div
              key={message.message_id}
              style={{
                display: "flex",
                justifyContent: isSender ? "flex-end" : "flex-start",
                padding: "5px 10px"
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: isSender ? "#dcf8c6" : "#fff",
                  color: "#000",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
                }}
              >
                <strong>{!isSender && message.member_id}</strong>

                {/* 텍스트만 표시 */}
                {message.content && <p style={{ margin: 0 }}>{message.content}</p>}

                {/* 이미지만 표시 */}
                {message.image_url && (
                  <img
                    src={`${supabase.storage.from("chat-images").getPublicUrl(message.image_url).data.publicUrl}`}
                    alt="첨부 이미지"
                    style={{
                      marginTop: "10px",
                      maxWidth: "100%",
                      borderRadius: "10px"
                    }}
                  />
                )}

                {/* 메시지 내용 표시 */}
                {/* <p style={{ margin: 0 }}>{message.content}</p> */}
                {/* 이미지 표시 */}
                {/* <Image
                  src={`${supabase.storage.from("chat-images").getPublicUrl(message.image_url).data.publicUrl}`}
                  alt="이미지"
                  width={100}
                  height={100}
                /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Todo: next image 로 바꾸기