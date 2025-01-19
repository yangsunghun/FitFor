"use client";

import { useState } from "react";
import { sendMessage } from "../../_utils/chat";
import { useMutation } from "@tanstack/react-query";
import { Image } from "@phosphor-icons/react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/Button";

interface ChatInputProps {
  roomId: string;
  memberId: string;
}

const ChatInput = ({ roomId, memberId }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const currentUser = useAuthStore((state) => state.user);

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
    },
    onError: (error: Error) => {
      console.error("메시지 전송 실패:", error.message);
    }
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    mutation.mutate({ message, file: null });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (!selectedFile) return;

    // 파일 전송
    mutation.mutate({ message: "", file: selectedFile });

    // 입력 초기화
    e.target.value = ""; // 동일 파일 선택을 허용하려면 필요
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const maxLength = 100;

  return (
    <footer className="flex h-[150px] w-[996px] flex-col justify-between border-t border-[#e8e8e8] p-4">
      {/* 메시지 입력 필드 */}
      <div className="flex items-center">
        <textarea
          className="text-sm flex-1 resize-none rounded-lg px-4 py-2 placeholder-gray-500 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`${currentUser?.nickname}(으)로 메시지 작성`}
          maxLength={maxLength}
        />
        <div className="text-xs text-right text-gray-500">
          <span className="inline-block w-[3ch]">{message.length}</span> / {maxLength}
        </div>
      </div>

      {/* 파일 업로드와 전송 버튼 */}
      <div className="mt-2 flex items-center justify-between">
        {/* 파일 업로드 버튼 */}
        <label htmlFor="file-input" className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center">
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Image alt="사진 전송하기" size={28} className="text-gray-600" />
        </label>

        {/* 전송 버튼 */}
        <Button variant="disabled" onClick={handleSendMessage}>
          보내기
        </Button>
      </div>
    </footer>
  );
};

export default ChatInput;
