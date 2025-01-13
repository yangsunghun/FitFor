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
  const [file, setFile] = useState<File | null>(null);

  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    let fileUrl = null;

    if (file) {
      const { data, error: uploadError } = await supabase.storage
        .from("chat-images") // "chat-images"는 Supabase 버킷 이름입니다.
        .upload(`rooms/${roomId}/${Date.now()}-${file.name}`, file); // rooms 폴더에 저장

      if (uploadError) {
        console.error("File upload error:", uploadError.message);
        return;
      }
      fileUrl = data?.path;
    }

    const { error } = await supabase.from("chat_messages").insert({
      content: message || null,
      member_id: memberId,
      room_id: roomId,
      image_url: fileUrl || null,
      created_at: new Date().toISOString()
    });

    if (!error) {
      setMessage("");
      setFile(null);
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

      {/* 사진 업로드 */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        id="file-input"
      />

      <button onClick={sendMessage} style={{ padding: "10px" }}>
        전송
      </button>
    </div>
  );
}
