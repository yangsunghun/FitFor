"use client";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

type TagFiltersProps = {
  tags: { [key: string]: string[] };
  handleToggleTag: (groupKey: string, tag: string) => void;
};

const RoomFilters = ({ tags, handleToggleTag }: TagFiltersProps) => {
  return (
    <Tabs defaultValue={TAG_GROUPS[0].key} className="space-y-10">
      {/* Tabs List: 탭 메뉴 */}
      <TabsList className="h-full w-full justify-start rounded-none border-b bg-transparent p-0">
        {TAG_GROUPS.map((group) => (
          <TabsTrigger
            key={group.key}
            value={group.key}
            className="inline-flex h-full items-center justify-center whitespace-nowrap rounded-none border-b-2 border-transparent px-[32px] py-[14.5px] text-title2 font-medium !shadow-none !outline-none transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary-default data-[state=active]:bg-white data-[state=active]:text-primary-default data-[state=active]:shadow"
          >
            {group.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content: 탭별 태그 */}
      {TAG_GROUPS.map((group) => (
        <TabsContent key={group.key} value={group.key}>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <button key={tag} onClick={() => handleToggleTag(group.key, tag)}>
                <Tags label={tag} variant={tags[group.key]?.includes(tag) ? "black" : "gray"} />
              </button>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default RoomFilters;
