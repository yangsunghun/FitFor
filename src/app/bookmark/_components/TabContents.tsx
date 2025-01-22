"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import BookmarkList from "../_components/BookmarkList";
import LikedPostList from "../_components/LikedPostList";

const TabContents = () => {
  const { activeTab, handleTabChange } = useActiveTabs();
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="h-14 w-full">
      <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0">
        <TabsTrigger
          value="tab-0"
          className="h-full w-1/2 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none"
        >
          북마크
        </TabsTrigger>
        <TabsTrigger
          value="tab-1"
          className="h-full w-1/2 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none"
        >
          좋아요한 게시물
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tab-0">
        <BookmarkList />
      </TabsContent>

      <TabsContent value="tab-1">
        <LikedPostList />
      </TabsContent>
    </Tabs>
  );
};

export default TabContents;
