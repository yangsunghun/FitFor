"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/utils/chat/fetchMessages";
import Image from "next/image";

const supabase = createClient();

type ChatMessagesProps = {
  roomId: string;
  currentUserId: string; // 현재 로그인한 사용자의 ID
};

const ChatMessages = ({ roomId, currentUserId }: ChatMessagesProps) => {
  const queryClient = useQueryClient();

  // 메시지 쿼리
  const {
    data: messages = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: () => fetchMessages(roomId),
    staleTime: 1000 * 60 // 1분간 캐시 유지
  });

  // 실시간 구독
  useEffect(() => {
    const subscription = supabase
      .channel("realtime:chat_messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        // 새 메시지가 생기면 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: ["chatMessages", roomId]
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, queryClient]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>메시지를 불러오는 중 오류가 발생했습니다.</div>;

return (
  <div className="mb-[20px] flex flex-col">
    <div className="flex flex-col gap-[16px]">
      {messages.map((message: any) => {
        const isSender = message.member_id === currentUserId;

        return (
          <div
            key={message.message_id}
            className={`flex ${isSender ? "justify-end" : "justify-start"} items-start gap-[16px]`}
          >
            {/* 프로필 이미지 (수신자만 표시) */}
            {!isSender && (
              <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full">
                <img className="h-[40px] w-[40px] rounded-full" src="https://via.placeholder.com/40x40" alt="Avatar" />
              </div>
            )}

            {/* 메시지와 이미지 박스 */}
            <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[60%] gap-[8px]`}>
              {/* 닉네임 (수신자만 표시) */}
              {!isSender && (
                <span className="text-[13px] font-medium leading-tight text-[#6e6e6e]">
                  {message.member_name || message.member_id}
                </span>
              )}

              {/* 메시지와 작성 시간 */}
              <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-end gap-[12px]`}>
                {/* 메시지 박스 */}
                {message.content && (
                  <div
                    className={`break-words rounded-lg px-[16px] py-[12px] ${
                      isSender ? "bg-green-100" : "bg-neutral-100"
                    }`}
                    style={{
                      maxWidth: "800px", // 메시지 박스의 최대 너비 제한
                      wordBreak: "break-word" // 긴 단어를 줄바꿈
                    }}
                  >
                    <p className="m-0 text-[15px] font-medium leading-snug text-[#1a1a1a]">{message.content}</p>
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
                  className={`text-[11px] font-medium leading-none text-[#6e6e6e] ${
                    isSender ? "ml-[8px] self-end" : "mr-[8px] self-end"
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
    </div>
  </div>
);


};

export default ChatMessages;
