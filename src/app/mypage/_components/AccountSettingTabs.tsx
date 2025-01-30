import ModalItem from "@/components/ui/Modal";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import AccountDeleteContent from "./AccountDeleteContent";
import AgreementContent from "./AgreementContent";
import LogOutContent from "./LogOutContent";
import ServiceContent from "./ServiceContent";

type AccountModalMode = "agreement" | "serviceRule" | "deleteAccount" | "logout";

const contentComponents: Record<AccountModalMode, React.ComponentType<{ closeModal: () => void }>> = {
  serviceRule: ServiceContent,
  agreement: AgreementContent,
  deleteAccount: AccountDeleteContent,
  logout: LogOutContent
};

const AccountSettingTabs = () => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<AccountModalMode>("agreement");

  const menuItems: { title: string; mode: AccountModalMode }[] = [
    { title: "서비스 약관", mode: "serviceRule" },
    { title: "개인정보 수집 처리방침", mode: "agreement" },
    { title: "로그아웃", mode: "logout" },
    { title: "탈퇴하기", mode: "deleteAccount" }
  ];

  const openModal = (mode: AccountModalMode) => {
    setModal(true);
    setMode(mode);
  };

  const closeModal = () => {
    setModal(false);
  };

  const SelectedContent = contentComponents[mode];

  return (
    <>
      <div className="mt-10 flex w-full flex-col space-y-6 tb:mt-6">
        {menuItems.map((item) => (
          <button
            onClick={() => openModal(item.mode)}
            key={item.title}
            className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50 tb:text-body"
          >
            <span>{item.title}</span>
            <CaretRight className="text-title1 tb:text-body" />
          </button>
        ))}
      </div>

      <ModalItem isOpen={modal} onClose={closeModal} className="mb:p-4">
        <SelectedContent closeModal={closeModal} />
      </ModalItem>
    </>
  );
};

export default AccountSettingTabs;
