"use client";

import { useState } from "react";
import { sendMessage } from "../../_utils/chat";
import { useMutation } from "@tanstack/react-query";

interface ChatInputProps {
  roomId: string;
  memberId: string;
}

const ChatInput = ({ roomId, memberId }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: (newMessage: { message: string; file: File | null }) =>
      sendMessage({
        message: newMessage.message,
        file: newMessage.file,
        roomId,
        memberId
      }),
    onSuccess: () => {
      // 성공 후 입력 필드 초기화
      setMessage("");
      setFile(null);
    },
    onError: (error: Error) => {
      console.error("메시지 전송 실패:", error.message);
    }
  });

  const handleSendMessage = () => {
    if (!message.trim() && !file) return;
    mutation.mutate({ message, file });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요"
        style={{
          padding: "10px",
          width: "calc(100% - 60px)",
          marginRight: "10px"
        }}
      />

      {/* 사진 업로드 */}
      <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} id="file-input" />

      <button onClick={handleSendMessage} style={{ padding: "10px" }}>
        전송
      </button>
    </div>
  );
};

export default ChatInput;
