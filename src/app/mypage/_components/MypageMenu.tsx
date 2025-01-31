"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { MYPAGE_MENU } from "@/lib/constants/constants";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import AccountSettingTabs from "./AccountSettingTabs";
import MyPosts from "./MyPosts";
import RecentViewPosts from "./RecentViewPosts";
import VerificationSection from "./VerificationSection";

const MypageMenu = () => {
  const { activeTab, handleTabChange } = useActiveTabs(4);

  return (
    <div className="container mx-auto max-w-7xl">
      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-14 w-full">
        <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0">
          {MYPAGE_MENU.map((tab, index) => (
            <TabsTrigger
              key={`tab-${index}`}
              value={`tab-${index}`}
              className="h-full w-1/4 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-primary-default data-[state=active]:text-primary-default data-[state=active]:shadow-none tb:text-body"
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
