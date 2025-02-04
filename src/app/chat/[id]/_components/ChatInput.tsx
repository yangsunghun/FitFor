import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { sendMessage } from "@/lib/utils/chat/chat";
import { Image, Lock, PaperPlaneTilt } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// (임시) 중복 로직 수정필요

type InputProps = {
  roomId: string;
};

export const MobileInput = ({ roomId }: InputProps) => {
  const [message, setMessage] = useState("");
  const currentUser = useAuthStore((state) => state.user);
  const isVerified = currentUser?.is_verified; // 인증유저 확인

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: (newMessage: { message: string; file: File | null }) => {
      if (!currentUser) {
        throw new Error("로그인하지 않은 사용자는 메시지를 보낼 수 없습니다.");
      }
      return sendMessage({
        message: newMessage.message,
        file: newMessage.file,
        roomId,
        memberId: currentUser.id
      });
    },
    onSuccess: () => {
      // 입력 필드 초기화
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
    if (!selectedFile || !isVerified) return;

    // 파일 전송
    mutation.mutate({ message: "", file: selectedFile });

    // 입력 초기화 (동일 파일 선택 허용)
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && isVerified) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative flex">
      <textarea
        className="mx-4 mb-3 mt-2 h-11 w-full resize-none rounded-md border-gray-300 bg-bg-02 p-3 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isVerified ? "메시지를 입력해주세요." : "인증 유저만 채팅에 참여할 수 있어요."}
        disabled={!isVerified}
      />

      {/* 버튼 */}
      <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />

      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        {isVerified ? (
          message.trim() ? (
            <button className="p-2 transition-all duration-200" onClick={handleSendMessage}>
              <PaperPlaneTilt size={24} className="text-primary-default" weight="fill" />
            </button>
          ) : (
            <label
              htmlFor="file-upload"
              className="cursor-pointer rounded-full p-2 text-white transition-all duration-200"
            >
              <Image size={24} className="text-text-03" />
            </label>
          )
        ) : (
          <div className="p-2">
            <Lock size={24} className="text-gray-500" weight="fill" />
          </div>
        )}
      </div>
    </div>
  );
};

export const DesktopInput = ({ roomId }: InputProps) => {
  const [message, setMessage] = useState("");
  const currentUser = useAuthStore((state) => state.user);
  const isVerified = currentUser?.is_verified; // 인증유저 확인

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: (newMessage: { message: string; file: File | null }) => {
      if (!currentUser) {
        throw new Error("로그인하지 않은 사용자는 메시지를 보낼 수 없습니다.");
      }
      return sendMessage({
        message: newMessage.message,
        file: newMessage.file,
        roomId,
        memberId: currentUser.id
      });
    },
    onSuccess: () => {
      // 입력 필드 초기화
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
    if (!selectedFile || !isVerified) return;

    // 파일 전송
    mutation.mutate({ message: "", file: selectedFile });

    // 입력 초기화 (동일 파일 선택 허용)
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && isVerified) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative flex flex-col border-t border-line-02 bg-white px-4 py-4">
      {/* 🔒 인증 안 된 경우 아이콘 표시 */}
      {!isVerified && (
        <Lock size={24} className="absolute left-4 top-[20%] -translate-y-[30%] transform text-text-03" weight="fill" />
      )}
      <textarea
        className="w-full resize-none pl-8 pt-1 text-title2 font-medium text-text-03 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isVerified ? "메시지를 입력해주세요." : "인증 유저만 채팅에 참여할 수 있어요."}
        disabled={!isVerified}
      />

      <div className="flex items-center justify-between">
        <label htmlFor="file-input" className="flex cursor-pointer items-center justify-center">
          <input type="file" id="file-input" className="hidden" onChange={handleFileUpload} />
          <Image alt="사진 전송하기" size={28} className="text-gray-600" />
        </label>
        <Button variant="disabled" onClick={handleSendMessage}>
          보내기
        </Button>
      </div>
    </div>
  );
};
