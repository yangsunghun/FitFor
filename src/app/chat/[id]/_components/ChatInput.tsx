"use client";

import { useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface ChatInputProps {
  roomId: string;
  memberId: string;
}

export default function ChatInput({ roomId, memberId }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const { error } = await supabase.from("chat_messages").insert({
      content: message,
      member_id: memberId,
      room_id: roomId,
      created_at: new Date().toISOString()
    });

    if (!error) {
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요"
        style={{
          padding: "10px",
          width: "calc(100% - 60px)",
          marginRight: "10px"
        }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        전송
      </button>
    </div>
  );
}
