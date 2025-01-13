"use client";

import { useState, useEffect } from "react";
import ChatInput from "./_components/ChatInput";
import ChatMessages from "./_components/ChatMessages";
import { exitChatRoom, deleteChatRoom } from "../_utils/chat"; // 이미 구현된 공통 함수 사용
import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";
import Tabs from "./_components/Tabs";
import ChatGallery from "./_components/ChatGallery";

const supabase = createClient(); // Supabase 클라이언트 생성

interface ChatRoomPageProps {
  params: { id: string }; // App Router에서 제공하는 동적 경로 파라미터
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id: roomId } = params; // URL에서 가져온 동적 채팅방 ID
  const currentUser = useAuthStore((state) => state.user); // 현재 로그인된 사용자 정보

  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
  const [isOwner, setIsOwner] = useState(false); // 방장 여부 상태

  useEffect(() => {
    const checkOwnership = async () => {
      if (!currentUser) return;

      try {
        // 방장의 user_id를 확인
        const { data, error } = await supabase.from("chat_rooms").select("user_id").eq("room_id", roomId).single();

        if (error || !data) {
          setError("방 정보를 가져올 수 없습니다.");
          return;
        }

        // 현재 사용자가 방장인지 확인
        setIsOwner(data.user_id === currentUser.id);
      } catch (err) {
        setError("방장 여부 확인 중 오류가 발생했습니다.");
      }
    };

    checkOwnership();
  }, [currentUser, roomId]);

  const handleDeleteChatRoom = async () => {
    if (!currentUser) {
      setError("로그인 상태를 확인해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, error } = await deleteChatRoom(currentUser.id, roomId); // 공통 삭제 함수 호출

      if (!success) {
        throw new Error(error); // 삭제 실패 시 에러 발생
      }

      alert("채팅방이 삭제되었습니다."); // 성공 메시지
      window.location.href = "/"; // 홈으로 이동
    } catch (err) {
      setError(String(err)); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  const handleExitChatRoom = async () => {
    if (!currentUser) {
      setError("로그인 상태를 확인해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, error } = await exitChatRoom(currentUser.id, roomId); // 공통 퇴장 함수 호출

      if (!success) {
        throw new Error(error); // 퇴장 실패 시 에러 발생
      }

      alert("채팅방에서 퇴장했습니다."); // 성공 메시지
      window.location.href = "/"; // 홈으로 이동
    } catch (err) {
      setError(String(err)); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-5">
      <h1 className="text-2xl mb-4 text-center font-bold">채팅방</h1>
      {currentUser ? (
        <Tabs labels={["Chat", "Gallery"]}>
          {/* 탭 1: 채팅 */}
          <div>
            <ChatMessages roomId={roomId} currentUserId={currentUser.id} />
            <ChatInput roomId={roomId} memberId={currentUser.id} />
          </div>
          {/* 탭 2: 갤러리 */}
          <div>
            <p>채팅방에서 업로드한 이미지들을 표시합니다.</p>
            {/* 갤러리 컴포넌트 추가 */}
            <ChatGallery roomId={roomId} />
          </div>
        </Tabs>
      ) : (
        <p className="text-center text-gray-500">로그인 후에 메시지를 입력할 수 있습니다.</p>
      )}

      <div className="mt-6 text-center">
        {/* 퇴장 버튼 */}
        <button
          onClick={handleExitChatRoom}
          disabled={loading}
          className={`rounded-md px-6 py-2 font-semibold text-white transition-all ${
            loading ? "cursor-not-allowed bg-gray-400" : "hover:opacity-90"
          }`}
          style={{
            backgroundColor: "#ff4d4d" // 퇴장 버튼 HEX 색상 유지
          }}
        >
          {loading ? "Leaving..." : "Leave Chat Room"}
        </button>
        {isOwner && (
          <button
            onClick={handleDeleteChatRoom}
            disabled={loading}
            className={`ml-4 rounded-md px-6 py-2 font-semibold text-white transition-all ${
              loading ? "cursor-not-allowed bg-gray-400" : "hover:opacity-90"
            }`}
            style={{
              backgroundColor: "#ff0000" // 삭제 버튼 HEX 색상 유지
            }}
          >
            {loading ? "Deleting..." : "Delete Chat Room"}
          </button>
        )}
        {/* 에러 메시지 표시 */}
        {error && <p className="mt-4 font-medium text-red-500">{error}</p>}
      </div>
    </div>
  );
}
