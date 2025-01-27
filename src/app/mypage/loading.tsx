import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { MYPAGE_MENU } from "@/lib/constants/constants";
import ProfileSkeleton from "./_components/ProfileSkeleton";

const loading = () => {
  return (
    <div className="mx-auto h-screen max-w-[62.25rem] justify-items-center tb:mt-10">
      <ProfileSkeleton />
      <div className="container mx-auto max-w-7xl">
        {/* 탭 네비게이션 */}
        <Tabs defaultValue={"tab-0"} className="h-14 w-full">
          <TabsList className="h-full w-full justify-start rounded-none border-t bg-transparent p-0">
            {MYPAGE_MENU.map((tab, index) => (
              <TabsTrigger
                key={`tab-${index}`}
                value={`tab-${index}`}
                className="h-full w-1/4 rounded-none border-t-2 border-transparent px-2 py-2 text-title2 data-[state=active]:border-black data-[state=active]:shadow-none tb:text-body tb:data-[state=active]:border-primary-default tb:data-[state=active]:text-primary-default"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default loading;
