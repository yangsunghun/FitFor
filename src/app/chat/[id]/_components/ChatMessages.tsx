"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "@/lib/utils/chat/fetchMessages";

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
    <div className="mb-5 flex flex-col">
      <h2 className="text-xl mb-3 font-bold">채팅 메시지</h2>
      <div className="flex flex-col gap-4">
        {messages.map((message: any) => {
          const isSender = message.member_id === currentUserId;

          return (
            <div
              key={message.message_id}
              className={`flex ${isSender ? "justify-end" : "justify-start"} items-start gap-2`}
            >
              {/* 왼쪽: 프로필 이미지 (수신자만 표시) */}
              {!isSender && <div className="h-10 w-10 rounded-full bg-gray-300"></div>}

              {/* 중앙: 메시지 내용 */}
              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[60%]`}>
                {/* 이름 (수신자만 표시) */}
                {!isSender && (
                  <span className="text-sm mb-1 font-bold text-gray-600">
                    {message.member_name || message.member_id}
                  </span>
                )}

                {/* 메시지 박스와 작성 시간 */}
                <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-center gap-2`}>
                  {/* 메시지 박스 */}
                  <div className={`rounded-lg p-3 shadow-sm ${isSender ? "bg-green-100" : "bg-gray-200"} break-words`}>
                    {message.content && <p className="m-0">{message.content}</p>}
                    {message.image_url && (
                      <img
                        src={`${supabase.storage.from("chat-images").getPublicUrl(message.image_url).data.publicUrl}`}
                        alt="첨부 이미지"
                        className="mt-2 max-w-full rounded-lg"
                      />
                    )}
                  </div>

                  {/* 작성 시간 */}
                  <span className="text-xs mb-1 self-end text-gray-500">
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
}

export default ChatMessages;