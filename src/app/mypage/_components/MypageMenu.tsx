"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/lib/store/authStore";
import type { PostType } from "@/lib/types/post";
import { fetchBookmarks } from "@/lib/utils/mypage/userInfo";
import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import ContentList from "./ContentList";
import StatsCard from "./StatsCard";
import VerificationSection from "./VerificationSection";

// 임시 샘플
const sampleTabs = Array(5)
  .fill(null)
  .map((_, i) => ({
    label: `label ${i + 1}`,
    content: Array(8)
      .fill(null)
      .map(
        (_, j): PostType => ({
          id: `post-${i}-${j}`,
          title: `Post ${j + 1}`,
          thumbnail: "/images/image-broken.png",
          body_size: [123, 123],
          comments: Math.floor(Math.random() * 100),
          content: `This is the content of Post ${j + 1}.`,
          created_at: new Date().toISOString(),
          likes: Math.floor(Math.random() * 1000),
          tags: [`tag${j + 1}`, `label${i + 1}`],
          upload_place: `Location ${j + 1}`,
          user_id: `user-${i}`,
          view: Math.floor(Math.random() * 5000),
          users: { nickname: "random" }
        })
      )
  }));

const sampleStats = {
  posts: 42,
  likes: 128,
  views: 1337
};

const MypageMenu = () => {
  const { user } = useAuthStore();
  const { data: userBookmarks, isPending: isUserBookmarksPending } = useQuery({
    queryKey: ["userBookmarks"],
    queryFn: async () => {
      return await fetchBookmarks(user!.id);
    },
    initialData: [],
    enabled: !!user // 유저가 존재할때만 실행
  });

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
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 0번 탭 */}
        <TabsContent value="tab-0">
          {userBookmarks && (
            <ContentList title="내가 북마크한 포스트" subtitle="Bookmarks" posts={userBookmarks} />
          )}
          <ContentList title="최근 본 포스트" subtitle="Recent" posts={sampleTabs[0].content.slice(4, 8)} />
        </TabsContent>

        {/* 1번 탭 */}
        <TabsContent value="tab-1">
          <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatsCard title="작성한 게시물 수" value={sampleStats.posts} />
            <StatsCard title="받은 좋아요 수" value={sampleStats.likes} />
            <StatsCard title="총 조회수" value={sampleStats.views} />
          </div>

          <VerificationSection nickname={"사용자"} isVerified={false} />

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
        {sampleTabs.slice(2).map((tab, index) => (
          <TabsContent key={`content-${index + 2}`} value={`tab-${index + 2}`}>
            <p>Content for {tab.label}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MypageMenu;
