"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface ChatMessagesProps {
  roomId: string;
}

export default function ChatMessages({ roomId }: ChatMessagesProps) {
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
    fetchMessages();

    const subscription = supabase
      .channel("realtime:chat_messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>채팅 메시지</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((message) => (
          <li
            key={message.message_id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd"
            }}
          >
            <strong>{message.member_id}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
