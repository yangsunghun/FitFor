"use client";
import { REGIONS, TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Tags = { [key: string]: string[] };
type Props = {
  handleClose: () => void;
};

const HeaderCategorys = ({ handleClose }: Props) => {
  const [tags, setTags] = useState<Tags>({});
  const router = useRouter();
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const { handleToggleTag, encodeTagsForUrl } = useSearchQuery();

  const handleCategoryClick = (key: string, tag: string) => {
    handleToggleTag(key, tag);

    const updatedTags = { ...tags, [key]: [...(tags[key] || []), tag] };

    const params = new URLSearchParams();
    params.set("query", "");
    params.set("page", "1");
    params.set("category", encodeTagsForUrl(updatedTags));

    setSelectedCategory(key);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      {TAG_GROUPS.map((group) => (
        <div key={group.key} className="text-title2">
          <p className="mb-8 font-bold">{group.title}</p>

          <ul className="mr-6 flex h-[32rem] flex-col flex-wrap border-r border-line-02">
            {group.tags.map((tag) => (
              <li
                key={tag}
                onClick={handleClose}
                className="mb-6 w-[8.75rem] font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
              >
                <button onClick={() => handleCategoryClick(group.key, tag)}>{tag}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="text-title2">
        <p className="mb-8 font-bold">지역</p>

        <ul className="flex h-[32rem] flex-col flex-wrap">
          {REGIONS.map((region, index) => (
            <li
              key={index}
              className="mb-6 w-[6.875rem] font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
            >
              <button className="">{region}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HeaderCategorys;
