"use client";

import { Tags } from "@/components/ui/Tags";
import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { memo } from "react";

type Props = {};

const LocationTags = memo(({}: Props) => {
  const { activeLocation, setActiveLocation } = useLocationQuery();

  return (
    <>
      <h2 className="mb-6 text-title1 font-bold mb:mb-0 mb:text-title2">지역별 옷차림</h2>
      <div className="mb-6 flex flex-wrap gap-3">
        {REGIONS_WITH_QUERY.map((tag) => (
          <button key={tag.title} onClick={() => setActiveLocation(tag.query)} className="focus:outline-none">
            <Tags size="lg" label={tag.title} variant={activeLocation === tag.query ? "black" : "gray"} />
          </button>
        ))}
      </div>
    </>
  );
});

LocationTags.displayName = "LocationTags";

export default LocationTags;
