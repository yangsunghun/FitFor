import ModalItem from "@/components/ui/Modal";
import { useAuthStore } from "@/lib/store/authStore";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import AccountDeleteContent from "./AccountDeleteContent";
import AgreementContent from "./AgreementContent";
import ServiceContent from "./ServiceContent";
import SignoutButton from "./SignoutButton";

const menuItems: { title: string; mode: AccountModalMode }[] = [
  {
    title: "서비스 약관",
    mode: "serviceRule"
  },
  {
    title: "개인정보 수집 처리방침",
    mode: "agreement"
  },
  {
    title: "모바일 버전",
    mode: "mobile"
  },
  { title: "탈퇴하기", mode: "deleteAccount" }
];

type AccountModalMode = "agreement" | "serviceRule" | "deleteAccount" | "mobile" | "default";

const AccountSettingTabs = () => {
  const { deleteUser } = useAuthStore();
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<AccountModalMode>("default");

  const openModal = (mode: AccountModalMode) => {
    if (mode !== "mobile") {
      setModal(true);
      setMode(mode);
    } else {
      handleClick();
    }
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
            onClick={() => openModal(item.mode)}
            key={item.title}
            className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50"
          >
            <span>{item.title}</span>
            <CaretRight size={24} />
          </button>
        ))}
        <SignoutButton />
      </div>

      <ModalItem isOpen={modal} onClose={closeModal}>
        {mode === "serviceRule" && <ServiceContent closeModal={closeModal} />}
        {mode === "deleteAccount" && (
          <AccountDeleteContent closeModal={closeModal} handleDeleteAccount={handleDeleteAccount} />
        )}
        {mode === "agreement" && <AgreementContent closeModal={closeModal} />}
      </ModalItem>
    </>
  );
};

export default AccountSettingTabs;
