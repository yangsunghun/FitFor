import ModalItem from "@/components/ui/Modal";
import { CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import AccountDeleteContent from "./AccountDeleteContent";
import AgreementContent from "./AgreementContent";
import LogOutContent from "./LogOutContent";
import ServiceContent from "./ServiceContent";

type AccountModalMode = "agreement" | "serviceRule" | "deleteAccount" | "logout";

const AccountSettingTabs = () => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<AccountModalMode>("agreement");
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
      title: "로그아웃",
      mode: "logout"
    },
    { title: "탈퇴하기", mode: "deleteAccount" }
  ];

  const openModal = (mode: AccountModalMode) => {
    setModal(true);
    setMode(mode);
  };

  const closeModal = () => {
    setModal(false);
  };

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

      {/* 리팩터링이 하고 싶은데... 아이디어가 없다... */}
      <ModalItem isOpen={modal} onClose={closeModal} className="mb:p-4">
        {mode === "serviceRule" && <ServiceContent closeModal={closeModal} />}
        {mode === "deleteAccount" && <AccountDeleteContent closeModal={closeModal} />}
        {mode === "agreement" && <AgreementContent closeModal={closeModal} />}
        {mode === "logout" && <LogOutContent closeModal={closeModal} />}
      </ModalItem>
    </>
  );
};

export default AccountSettingTabs;
