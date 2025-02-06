import ModalItem from "@/components/ui/Modal";
import { CaretRight } from "@phosphor-icons/react";
import { ComponentType, useState } from "react";
import AccountDeleteContent from "./AccountDeleteContent";
import AgreementContent from "./AgreementContent";
import LogOutContent from "./LogOutContent";
import ProjectInfoContent from "./ProjectInfoContent";
import ServiceContent from "./ServiceContent";

type AccountModalMode = "agreement" | "serviceRule" | "deleteAccount" | "logout" | "info";

const contentComponents: Record<AccountModalMode, ComponentType<{ closeModal: () => void }>> = {
  serviceRule: ServiceContent,
  agreement: AgreementContent,
  deleteAccount: AccountDeleteContent,
  logout: LogOutContent,
  info: ProjectInfoContent
};

const AccountSettingTabs = () => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<AccountModalMode>("agreement");

  const menuItems: { title: string; mode: AccountModalMode }[] = [
    { title: "서비스 약관", mode: "serviceRule" },
    { title: "개인정보 수집 처리 방침", mode: "agreement" },
    { title: "프로젝트 정보", mode: "info" },
    { title: "로그아웃", mode: "logout" },
    { title: "회원탈퇴", mode: "deleteAccount" }
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
      <div className="mt-10 flex w-full flex-col gap-8 tb:mt-6 tb:gap-6 tb:px-4">
        {menuItems.map((item) => (
          <button
            onClick={() => openModal(item.mode)}
            key={item.title}
            className="flex max-h-[3.25rem] items-center justify-between p-4 text-title2 font-medium text-text-04 hover:bg-gray-50 tb:h-auto tb:p-0 tb:text-body"
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
