"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import BookmarkList from "./BookmarkList";
import StatsCard from "./StatsCard";
import VerificationSection from "./VerificationSection";

// 임시 샘플
const sampleTabs = ["Posts", "Stats"];

const sampleStats = {
  posts: 42,
  likes: 128,
  views: 1337
};

const MypageMenu = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Tabs Navigation */}
      <Tabs defaultValue="tab-0" className="w-full">
        <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
          {sampleTabs.map((tab, index) => (
            <TabsTrigger
              key={`tab-${index}`}
              value={`tab-${index}`}
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-2"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 0번 탭 */}
        <TabsContent value="tab-0">
          <BookmarkList />
          <BookmarkList />
          {/* <ContentList title="최근 본 포스트" subtitle="Recent" posts={sampleTabs[0].content.slice(4, 8)} /> */}
        </TabsContent>

        {/* 1번 탭 */}
        <TabsContent value="tab-1">
          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatsCard title="작성한 게시물 수" value={sampleStats.posts} />
            <StatsCard title="받은 좋아요 수" value={sampleStats.likes} />
            <StatsCard title="총 조회수" value={sampleStats.views} />
          </div>

          <VerificationSection isVerified={false} />

          <div className="mb-8 rounded-lg bg-gray-100 p-8">
            <h3 className="mb-4 font-medium">인증배지 발급 종족 요건</h3>
            <ul className="list-disc space-y-4 pl-5">
              <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
              <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
              <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
            </ul>
          </div>
        </TabsContent>

        {/* 나머지 */}
        {/* {sampleTabs.slice(2).map((tab, index) => (
          <TabsContent key={`content-${index + 2}`} value={`tab-${index + 2}`}>
            <p>Content for {tab.label}</p>
          </TabsContent>
        ))} */}
      </Tabs>
    </div>
  );
};

export default MypageMenu;
