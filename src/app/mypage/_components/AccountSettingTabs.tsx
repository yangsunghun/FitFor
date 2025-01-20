import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import { useAuthStore } from "@/lib/store/authStore";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import SignoutButton from "./SignoutButton";

const menuItems = [
  {
    title: "약관 및 개인정보 처리 동의"
  },
  {
    title: "개인정보 처리방침"
  },
  {
    title: "모바일 버전"
  }
];

const AccountSettingTabs = () => {
  const { deleteUser } = useAuthStore();
  const [delAccount, setDelAccount] = useState(false);

  const openModal = () => {
    setDelAccount(true);
  };

  const handleDeletAccount = async () => {
    deleteUser();
  };

  const handleClick = () => {
    alert("서비스 준비 중입니다.");
  };

  return (
    <>
      <div className="mt-10 flex w-full flex-col space-y-6">
        {menuItems.map((item) => (
          <button
            onClick={handleClick}
            key={item.title}
            className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50"
          >
            <span>{item.title}</span>
            <CaretRight size={24} />
          </button>
        ))}
        <button
          onClick={openModal}
          className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50"
        >
          <span>탈퇴하기</span>
          <CaretRight size={24} />
        </button>
        <SignoutButton />
      </div>

      <ModalItem isOpen={delAccount} onClose={() => setDelAccount(false)}>
        <div className="flex w-[25.125rem] flex-col gap-4">
          <p className="text-title1 font-bold">정말 핏포를 탈퇴하실 건가요?</p>
          <p className="break-keep text-subtitle font-medium text-text-03">
            계정 탈퇴 후 회원정보 파기로 커뮤니티 혹은 작성했던 게시물과 댓글은 삭제 처리가 불가해요.
          </p>
          <div className="flex w-full flex-row gap-3">
            <Button variant="whiteLine" size="lg" className="w-full" onClick={() => setDelAccount(false)}>
              취소하기
            </Button>
            <Button size="lg" className="w-full" onClick={handleDeletAccount}>
              탈퇴하기
            </Button>
          </div>
        </div>
      </ModalItem>
    </>
  );
};

export default AccountSettingTabs;
