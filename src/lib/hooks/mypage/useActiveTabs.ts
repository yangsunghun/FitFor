"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useActiveTab = (defaultTab: string = "0") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // 활성화된 탭 url에 추가
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set("tab", tab);

    // 새로고침 없이 URL만 변경
    router.push(`/mypage?${currentParams.toString()}`);
  };

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  });

  return { activeTab, handleTabChange };
};

export default useActiveTab;
