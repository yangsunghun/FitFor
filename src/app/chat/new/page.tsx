import React from "react";
import { z } from "zod";
import type { chatRoomSchema } from "@/lib/validations/chatRoomSchema";
import ChatRoomForm from "./_components/ChatRoomForm";

export type ChatRoomFormInputs = z.infer<typeof chatRoomSchema>;

const CreateRoomPage = () => {
  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-10">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">Live 만들기</h1>
        <p className="text-title2 font-medium text-text-04">조언이 필요한 코디를 스타일 멘토와 공유해보세요!</p>
      </div>
      <div>
        <ChatRoomForm />
      </div>
    </div>
  );
};

export default CreateRoomPage;