'use client'

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { sendMessage } from "@/lib/utils/chat/chat";
import { createClient } from "@/lib/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export const useChatInput = (roomId: string) => {
  const supabase = createClient();
  const [message, setMessage] = useState("");
  const currentUser = useAuthStore((state) => state.user);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchMemberStatus = async () => {
      if (!currentUser) return;

      const { data, error } = await supabase
        .from("chat_members")
        .select("isActive, isAdmin")
        .eq("member_id", currentUser.id)
        .eq("room_id", roomId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching member status:", error);
        return;
      }

      if (data) {
        setIsActive(data.isActive);
        setIsAdmin(data.isAdmin);
      }
    };

    fetchMemberStatus();
  }, [currentUser, roomId]);

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
    if (!selectedFile || (!isAdmin && !isActive)) return;

    mutation.mutate({ message: "", file: selectedFile });
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (isAdmin || isActive)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    message,
    setMessage,
    isAllowedToChat: isAdmin || isActive,
    handleSendMessage,
    handleFileUpload,
    handleKeyDown
  };
};
