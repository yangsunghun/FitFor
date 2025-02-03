import React from "react";
import ChatRoomForm from "./_components/ChatRoomForm";
import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";

const CreateRoomPage = () => {
  return (
    <div className="inner relative mb:pt-10">
      <Link href="/chat" className="hidden mb:block">
        <CaretLeft size={20} weight="bold" />
      </Link>
      <div className="mx-auto max-w-[700px] pt-10 mb:pt-6">
        <div className="pb-10 mb:pb-6">
          <h1 className="text-title1 font-bold leading-[150%] text-text-04 mb:text-title2">Live 만들기</h1>
          <p className="text-title2 font-medium text-text-04 mb:text-body">
            조언이 필요한 코디를 스타일 멘토와 공유해보세요!
          </p>
        </div>
        <div>
          <ChatRoomForm />
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPage;
