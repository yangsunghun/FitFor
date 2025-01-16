import { CaretRight } from "@phosphor-icons/react";

const menuItems = [
  {
    title: "약관 및 개인정보 처리 동의"
  },
  {
    title: "개인정보 처리방침"
  },
  {
    title: "모바일 버전"
  },
  {
    title: "탈퇴 하기"
  }
];

const AccountSettingTabs = () => {
  return (
    <div className="flex w-full flex-col">
      {menuItems.map((item) => (
        <button
          key={item.title}
          className="flex items-center justify-between px-6 py-4 text-title2 font-medium text-text-04 hover:bg-gray-50"
        >
          <span>{item.title}</span>
          <CaretRight size={24} />
        </button>
      ))}
    </div>
  );
};

export default AccountSettingTabs;
