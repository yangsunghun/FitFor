"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";
import AccountSettingTabs from "./AccountSettingTabs";
import MyPosts from "./MyPosts";
import RecentViewPosts from "./RecentViewPosts";
import VerificationSection from "./VerificationSection";

const menuTabs = ["내 게시물", "히스토리", "인증", "계정 관리"];

const MypageMenu = () => {
  // 빈탭으로 초기화
  const [activeTab, setActiveTab] = useState("");

  // URL값과 활성화 된 탭 싱크 맞추기
  useEffect(() => {
    // useSearchParams 대신에 사용할 수 있는 방법
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");

    // 해당 tab query가 있는 경우에만 활성화 탭 세팅
    if (tabParam && menuTabs.some((_, index) => `tab-${index}` === tabParam)) {
      setActiveTab(tabParam);
    } else {
      // tab이 없는 경우 첫번째 탭 활성화
      setActiveTab("tab-0");
    }
  }, []);

  // 활성화 된 탭을 변경할때마다 URL 변경하는 함수
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // 새로고침 없이 URL만 변경
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-14 w-full">
        <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0">
          {menuTabs.map((tab, index) => (
            <TabsTrigger
              key={`tab-${index}`}
              value={`tab-${index}`}
              className="h-full w-1/4 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 내 게시물 */}
        <TabsContent value="tab-0">
          <MyPosts />
        </TabsContent>

        {/* 최근 조회 게시물 */}
        <TabsContent value="tab-1">
          <RecentViewPosts />
        </TabsContent>

        {/* 인증 */}
        <TabsContent value="tab-2">
          <VerificationSection />
        </TabsContent>

        {/* 계정 관리 */}
        <TabsContent value="tab-3">
          <AccountSettingTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MypageMenu;
