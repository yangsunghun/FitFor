import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";

type AccountDeleteContentProps = {
  closeModal: () => void;
};

const AccountDeleteContent = ({ closeModal }: AccountDeleteContentProps) => {
  const { deleteUser, user } = useAuthStore();
  const [inputValue, setInputValue] = useState("");
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const handleDeleteAccount = async () => {
    if (inputValue === user?.nickname) {
      deleteUser();
    }
  };

  return (
    <div className="flex w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
      <p className="text-title1 font-bold text-text-04 tb:text-title2">정말 핏포를 탈퇴하실 건가요?</p>
      <p className="break-keep text-subtitle font-medium text-text-03 tb:text-body">
        계정 탈퇴 후 회원정보 파기로 커뮤니티 혹은 작성했던 게시물과 댓글은 삭제 처리가 불가해요.
      </p>

      {/* 탈퇴 컨펌창 */}
      <div className="flex w-full flex-col gap-2">
        <TextField
          type="text"
          value={inputValue}
          variant={inputValue !== user?.nickname ? "error" : "default"}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 text-text-04"
          placeholder="사용자명을 입력하세요"
        />
        <p
          className={`text-body font-medium ${inputValue !== user?.nickname && inputValue.length !== 0 ? "text-status-danger" : "text-status-info"}`}
        >
          탈퇴를 원하시면 아래 입력란에 <strong>{user?.nickname}</strong>을(를) 입력하세요.
        </p>
      </div>

      <div className="flex w-full flex-row gap-3 tb:gap-2">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button
          size={isTabletOrSmaller ? "sm" : "lg"}
          variant={inputValue !== user?.nickname ? "disabled" : "primary"}
          className="w-full"
          onClick={handleDeleteAccount}
          disabled={inputValue !== user?.nickname}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );
};

export default AccountDeleteContent;
