"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useActiveTabs } from "@/lib/hooks/common/useActiveTabs";
import ChatGallery from "./ChatGallery";
import { DesktopInput, MobileInput } from "./ChatInput";
import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import ChatMessages from "./ChatMessages";

const ChatTabs = ({ roomId }: { roomId: string }) => {
  const { activeTab, handleTabChange } = useActiveTabs();
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="absolute left-0 top-[96px] h-[50px] w-full">
      <TabsList className="h-full w-full justify-start rounded-none bg-transparent p-0">
        <TabsTrigger
          value="tab-0"
          className="h-full w-1/2 rounded-none border-b-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-primary-default data-[state=active]:text-primary-default data-[state=active]:shadow-none tb:text-body"
        >
          채팅
        </TabsTrigger>
        <TabsTrigger
          value="tab-1"
          className="h-full w-1/2 rounded-none border-b-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-primary-default data-[state=active]:text-primary-default data-[state=active]:shadow-none tb:text-body"
        >
          갤러리
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tab-0">
        <ChatMessages roomId={roomId} />
        <MinTablet>
          <DesktopInput roomId={roomId} />
        </MinTablet>
        <Tablet>
          <MobileInput roomId={roomId} />
        </Tablet>
      </TabsContent>

      <TabsContent value="tab-1">
        <ChatGallery roomId={roomId} />
      </TabsContent>
    </Tabs>
  );
};

export default ChatTabs;
