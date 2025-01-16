"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AccountSettingTabs from "./AccountSettingTabs";
import MyPosts from "./MyPosts";
import RecentViewPosts from "./RecentViewPosts";
import VerificationSection from "./VerificationSection";

const menuTabs = ["내 게시물", "히스토리", "인증", "계정 관리"];

const MypageMenu = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Tabs Navigation */}
      <Tabs defaultValue="tab-0" className="w-full">
        <TabsList className="h-auto w-full justify-start rounded-none border-t bg-transparent p-0">
          {menuTabs.map((tab, index) => (
            <TabsTrigger
              key={`tab-${index}`}
              value={`tab-${index}`}
              className="w-1/4 rounded-none border-t-2 border-transparent px-6 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none"
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
          <VerificationSection isVerified={false} />
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
