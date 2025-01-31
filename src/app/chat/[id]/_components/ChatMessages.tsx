import { useAuthStore } from "@/lib/store/authStore";
import { ChatMessage } from "@/lib/types/chat";
import { fetchMessages } from "@/lib/utils/chat/fetchMessages";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";

const supabase = createClient();

type ChatMessageProps = {
  roomId: string;
};

const ChatMessages = ({ roomId }: ChatMessageProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    isError
  } = useQuery<ChatMessage[]>({
    queryKey: ["chatMessages", roomId],
    queryFn: () => fetchMessages(roomId),
    staleTime: 1000 * 60
  });

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

  if (isLoading) return <div></div>;
  if (isError) return <div>메시지를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="scrollbar-hide h-[calc(100vh-146px-139px)] flex-1 items-center justify-between overflow-y-auto bg-pink-100 px-4 pb-10 pt-6 tb:h-[calc(100vh-222px)]">
      <div className="flex w-full flex-col gap-4 tb:gap-1">
        {messages.map((messages: ChatMessage) => {
          const isSender = messages.member_id === currentUser?.id;

          return (
            <div key={messages.message_id} className={`mb-4 flex ${isSender ? "justify-end" : "justify-start"}`}>
              {/* 프로필 이미지 */}
              {!isSender && (
                <figure className="relative mr-2 h-10 w-10 items-center justify-center overflow-hidden rounded-full tb:h-6 tb:w-6">
                  <Image src={messages.chat_members?.users?.profile_image || ""} alt="" fill />
                </figure>
              )}
              {/* 메시지와 이미지 박스 */}
              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} max-w-[80%] gap-2`}>
                {/* 닉네임 */}
                <span className="text-caption font-medium leading-3 text-text-03">
                  {messages.chat_members?.users?.nickname}
                </span>

                {/* 메시지와 작성 시간 */}
                <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-end gap-3`}>
                  {/* 메시지 박스 */}
                  {messages.content && (
                    <div className="max-w-[800px] break-words break-all rounded-lg bg-bg-01 px-4 py-3 tb:px-3 tb:py-2">
                      <p className="m-0 whitespace-pre-wrap text-title2 font-medium leading-6 text-text-04 tb:text-body">
                        {messages.content}
                      </p>
                    </div>
                  )}

                  {/* 이미지 박스 */}
                  {messages.image_url && (
                    <div
                      className={`overflow-hidden rounded-lg ${isSender ? "self-end" : "self-start"}`}
                      style={{ maxWidth: "100%" }}
                    >
                      <Image
                        src={`${supabase.storage.from("chat-images").getPublicUrl(messages.image_url).data.publicUrl}`}
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
                    {new Date(messages.created_at).toLocaleTimeString("ko-KR", {
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
