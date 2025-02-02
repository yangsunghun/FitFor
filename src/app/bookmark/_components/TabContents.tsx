"use client";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import BookmarkList from "../_components/BookmarkList";

const TabContents = () => {
  const { activeTab, handleTabChange } = useActiveTabs();
  return (
    // <Tabs value={activeTab} onValueChange={handleTabChange} className="h-14 w-full tb:h-[48px]">
    //   <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0 tb:border-b tb:border-t-0 tb:border-line-02">
    //     <TabsTrigger
    //       value="tab-0"
    //       className="h-full w-1/2 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none tb:border-b-2 tb:border-t-0 tb:px-[15px] tb:py-[12px] tb:text-body tb:font-medium tb:data-[state=active]:border-primary-default tb:data-[state=active]:text-primary-default"
    //     >
    //       북마크
    //     </TabsTrigger>
    //     <TabsTrigger
    //       value="tab-1"
    //       className="h-full w-1/2 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none tb:border-b-2 tb:border-t-0 tb:px-[15px] tb:py-[12px] tb:text-body tb:font-medium tb:data-[state=active]:border-primary-default tb:data-[state=active]:text-primary-default"
    //     >
    //       좋아요한 게시물
    //     </TabsTrigger>
    //   </TabsList>

    //   <TabsContent value="tab-0">
    //     <BookmarkList />
    //   </TabsContent>

    //   <TabsContent value="tab-1">
    //     <LikedPostList />
    //   </TabsContent>
    // </Tabs>
    <BookmarkList />
  );
};

export default TabContents;
