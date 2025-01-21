import { MYPAGE_MENU } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

export const useActiveTabs = () => {
  // 빈 탭으로 초기화
  const [activeTab, setActiveTab] = useState("");

  // URL값과 활성화 된 탭 싱크 맞추기
  useEffect(() => {
    // useSearchParams 대신에 사용할 수 있는 방법
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");

    // 해당 tab query가 있는 경우에만 활성화 탭 세팅
    if (tabParam && MYPAGE_MENU.some((_, index) => `tab-${index}` === tabParam)) {
      setActiveTab(tabParam);
    } else {
      // tab이 없는 경우 첫번째 탭 활성화
      setActiveTab("tab-0");
    }
  });

  // 활성화 된 탭을 변경할때마다 URL 변경하는 함수
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // 새로고침 없이 URL만 변경
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  return {
    activeTab,
    handleTabChange
  };
};
