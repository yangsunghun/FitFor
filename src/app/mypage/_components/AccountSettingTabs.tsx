import ModalItem from "@/components/ui/Modal";
import { useAuthStore } from "@/lib/store/authStore";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import AccountDeleteContent from "./AccountDeleteContent";
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

type AccountModalMode = "deleteAccount" | "mobile" | "agreement" | "serviceRule" | ""

const AccountSettingTabs = () => {
  const { deleteUser } = useAuthStore();
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<AccountModalMode>("")

  const openModal = (mode: AccountModalMode) => {
    setModal(true);
    setMode(mode)
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleDeleteAccount = async () => {
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
          onClick={() => openModal("deleteAccount")}
          className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50"
        >
          <span>탈퇴하기</span>
          <CaretRight size={24} />
        </button>
        <SignoutButton />
      </div>

      <ModalItem isOpen={modal} onClose={closeModal}>
        <AccountDeleteContent closeModal={closeModal} handleDeleteAccount={handleDeleteAccount} />
      </ModalItem>
    </>
  );
};

export default AccountSettingTabs;
