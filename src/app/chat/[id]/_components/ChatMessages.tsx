"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/utils/chat/fetchMessages";
import Image from "next/image";
import sampleImage from "@/assets/images/image_sample.png";
import { ChatMessage } from "@/lib/types/chat";

const supabase = createClient();

type ChatMessagesProps = {
  roomId: string;
  currentUserId: string; // 현재 로그인한 사용자의 ID
};

const ChatMessages = ({ roomId, currentUserId }: ChatMessagesProps) => {
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 메시지 쿼리
  const {
    data: messages = [],
    isLoading,
    isError
  } = useQuery<ChatMessage[]>({
    queryKey: ["chatMessages", roomId],
    queryFn: () => fetchMessages(roomId),
    staleTime: 1000 * 60
  });

  // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // 실시간 구독
  useEffect(() => {
    const subscription = supabase
      .channel("realtime:chat_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `room_id=eq.${roomId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chatMessages", roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, queryClient]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>메시지를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="scrollbar-hide mb-5 flex h-[800px] w-full flex-col overflow-y-scroll rounded-lg bg-white">
      <div className="flex flex-col gap-6">
        {messages.map((message: ChatMessage) => {
          const isSender = message.member_id === currentUserId;

          return (
            <div
              key={message.message_id}
              className={`flex ${isSender ? "justify-end" : "justify-start"} items-start gap-4`}
            >
              {/* 프로필 이미지 (수신자만 표시) */}
              {!isSender && (
                <figure className="relative h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                  <Image
                    className="object-cover"
                    src={message.chat_members?.users?.profile_image || sampleImage}
                    alt={`${message.chat_members?.users?.nickname || "익명"}의 프로필 이미지`}
                    fill
                  />
                </figure>
              )}

              {/* 메시지와 이미지 박스 */}
              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[60%] gap-2`}>
                {/* 닉네임 (수신자만 표시) */}
                <span className="text-caption font-medium leading-3 text-text-03">
                  {message.chat_members?.users?.nickname}
                </span>

                {/* 메시지와 작성 시간 */}
                <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-end gap-3`}>
                  {/* 메시지 박스 */}
                  {message.content && (
                    <div className="max-w-[800px] break-words break-all rounded-lg bg-bg-02 px-4 py-3">
                      <p className="m-0 text-title2 font-medium leading-6 whitespace-pre-wrap text-text-04">{message.content}</p>
                    </div>
                  )}

                  {/* 이미지 박스 */}
                  {message.image_url && (
                    <div
                      className={`overflow-hidden rounded-lg ${isSender ? "self-end" : "self-start"}`}
                      style={{ maxWidth: "100%" }}
                    >
                      <Image
                        src={`${supabase.storage.from("chat-images").getPublicUrl(message.image_url).data.publicUrl}`}
                        alt="첨부 이미지"
                        width={300}
                        height={300}
                        className="w-full max-w-[300px] rounded-lg object-cover"
                        style={{ height: "auto" }}
                      />
                    </div>
                  )}

                  {/* 작성 시간 */}
                  <span
                    className={`text-small font-medium leading-none text-text-03 ${
                      isSender ? "ml-3 self-end" : "mr-3 self-end"
                    }`}
                  >
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
        {/* 스크롤 맨 아래로 이동하기 위한 참조 요소 */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
