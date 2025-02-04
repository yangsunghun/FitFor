import { useEffect, useState } from "react";

/**
 * 활성화된 탭으로 새로고침 후에도 보여주는 hook
 * 매개변수로 사용할 총 탭의 숫자를 넘겨주면 됩니다.
 *
 * 반환값(return)
 * activeTab [string]: 현재 활성화 된 탭
 * handleTabChange [(value: string) => void]: 활성화 탭의 URL을 업데이트 하는 함수
 */

export const useActiveTabs = (numberOfTabs: number = 5) => {
  // 빈 탭으로 초기화
  const [activeTab, setActiveTab] = useState("");

  // URL값과 활성화 된 탭 싱크 맞추기
  useEffect(() => {
    // useSearchParams 대신에 사용할 수 있는 방법
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");

    // 해당 tab query가 있는 경우에만 활성화 탭 세팅
    if (tabParam && isValidTab(tabParam, numberOfTabs)) {
      setActiveTab(tabParam);
    } else {
      // tab이 없는 경우 첫번째 탭 활성화
      setActiveTab("tab-0");
    }
  }, [numberOfTabs]);

  // 활성화 된 탭을 변경할때마다 URL 변경하는 함수
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // 새로고침 없이 URL만 변경
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  // 탭 범위 체크
  const isValidTab = (tabParam: string, numberOfTabs: number) => {
    // "tab-{index}"와 범위에 맞는지 확인
    const regex = /^tab-(\d+)$/;
    const match = tabParam.match(regex);
    if (!match) return false;

    const index = parseInt(match[1], 10);
    return index >= 0 && index < numberOfTabs;
  };

  return {
    activeTab,
    handleTabChange
  };
};
