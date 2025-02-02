"use client";

import { Tags } from "@/components/ui/Tags";
import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { memo, useState } from "react";

type Props = {};

const LocationTags = memo(({}: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const CURRENT_LOCATION_TAG = "현재 내 위치";

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  return (
    <>
      <h2 className="mb-6 text-title1 font-bold mb:mb-0 mb:text-title2">지역별 옷차림</h2>
      <div className="flex flex-wrap gap-3">
        <button className="focus:outline-none" onClick={() => handleTagClick(CURRENT_LOCATION_TAG)}>
          <Tags
            size="lg"
            label={CURRENT_LOCATION_TAG}
            variant={activeTag === CURRENT_LOCATION_TAG ? "black" : "gray"}
          />
        </button>

        {REGIONS_WITH_QUERY.map((tag) => (
          <button key={tag.title} onClick={() => handleTagClick(tag.query)} className="focus:outline-none">
            <Tags size="lg" label={tag.title} variant={activeTag === tag.query ? "black" : "gray"} />
          </button>
        ))}
      </div>
    </>
  );
});

LocationTags.displayName = "LocationTags";

export default LocationTags;
