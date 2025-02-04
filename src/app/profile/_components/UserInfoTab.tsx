"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import PostList from "./PostList";

type Props = {
  userId: string;
};

const UserInfoTab = ({ userId }: Props) => {
  const { activeTab, handleTabChange } = useActiveTabs(2);

  return (
    <div className="container mx-auto max-w-7xl">
      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-14 w-full">
        <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0">
          <TabsTrigger
            value={"tab-0"}
            className="h-full w-2/4 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none tb:text-body tb:data-[state=active]:border-primary-default tb:data-[state=active]:text-primary-default"
          >
            게시물
          </TabsTrigger>
        </TabsList>

        {/* 내 게시물 */}
        <TabsContent value="tab-0">
          <PostList userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserInfoTab;
