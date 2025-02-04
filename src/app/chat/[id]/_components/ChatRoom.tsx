'use client'

import { useAuthStore } from "@/lib/store/authStore";
import ChatHeader from "./ChatHeader";
import ChatTabs from "./ChatTabs";
import useModal from "@/lib/hooks/common/useModal";
import { useEffect } from "react";
import ModalItem from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type ChatRoomProps = {
  roomId: string;
};

const ChatRoom = ({ roomId }: ChatRoomProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const { isOpen, openModal, closeModal } = useModal();
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (currentUser && !currentUser.is_verified) {
      openModal();
    }
  }, [currentUser, openModal]);

  return (
    <div>
      <ChatHeader roomId={roomId} />
      <ChatTabs roomId={roomId} />

      <ModalItem isOpen={isOpen} onClose={closeModal} className="mb:p-4">
        <div className="flex w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
          <p className="text-title1 font-bold text-text-04 tb:text-title2">인증 유저만 채팅이 가능해요.</p>
          <p className="text-subtitle font-medium text-text-03 tb:text-body">
            인증 유저 신청은 마이페이지 - 인증 메뉴에서 확인할 수 있어요.
          </p>
          <div className="flex w-full flex-row gap-2">
            <Button variant="disabled" className="w-full !text-text-04" size={isTabletOrSmaller ? "sm" : "lg"}>
              나가기
            </Button>
            <Button size={isTabletOrSmaller ? "sm" : "lg"} onClick={closeModal} className="w-full">
              관전하기
            </Button>
          </div>
        </div>
      </ModalItem>
    </div>
  );
};

export default ChatRoom;

// h-[calc(100vh-80px)]
