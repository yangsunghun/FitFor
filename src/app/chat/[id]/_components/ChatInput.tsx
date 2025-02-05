import { Button } from "@/components/ui/Button";
import { useChatInput } from "@/lib/hooks/chat/useChatInput";
import { Image, Lock, PaperPlaneTilt } from "@phosphor-icons/react";

type InputProps = {
  roomId: string;
};

export const MobileInput = ({ roomId }: InputProps) => {
  const { message, setMessage, isAllowedToChat, handleSendMessage, handleFileUpload, handleKeyDown } =
    useChatInput(roomId);

  return (
    <div className="relative flex">
      <textarea
        className="mx-4 mb-3 mt-2 h-11 w-full resize-none rounded-md border-gray-300 bg-bg-02 p-3 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isAllowedToChat ? "메시지를 입력해주세요." : "인증 유저만 채팅에 참여할 수 있어요."}
        disabled={!isAllowedToChat}
      />

      <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />

      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        {isAllowedToChat ? (
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
  const { message, setMessage, isAllowedToChat, handleSendMessage, handleFileUpload, handleKeyDown } =
    useChatInput(roomId);

  return (
    <div className="relative flex flex-col border-t border-line-02 bg-white px-4 py-4">
      {!isAllowedToChat && (
        <Lock size={24} className="absolute left-4 top-[20%] -translate-y-[30%] transform text-text-03" weight="fill" />
      )}
      <textarea
        className="w-full resize-none pl-8 pt-1 text-title2 font-medium text-text-03 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isAllowedToChat ? "메시지를 입력해주세요." : "인증 유저만 채팅에 참여할 수 있어요."}
        disabled={!isAllowedToChat}
      />

      <div className="flex items-center justify-between">
        <label htmlFor="file-input" className="flex cursor-pointer items-center justify-center">
          <input type="file" id="file-input" className="hidden" onChange={handleFileUpload} />
          <Image alt="사진 전송하기" size={28} className="text-gray-600" />
        </label>
        <Button variant="disabled" onClick={handleSendMessage} disabled={!isAllowedToChat}>
          보내기
        </Button>
      </div>
    </div>
  );
};