"use client";

import { Tags } from "@/components/ui/Tags";
import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { memo } from "react";

type Props = {};

const LocationTags = memo(({}: Props) => {
  const { activeLocation, setActiveLocation } = useLocationQuery();
  const CURRENT_LOCATION_TAG = "현재 내 위치";

  return (
    <>
      <h2 className="mb-6 text-title1 font-bold mb:mb-0 mb:text-title2">지역별 옷차림</h2>
      <div className="flex flex-wrap gap-3">
        <button className="focus:outline-none" onClick={() => setActiveLocation(CURRENT_LOCATION_TAG)}>
          <Tags
            size="lg"
            label={CURRENT_LOCATION_TAG}
            variant={activeLocation === CURRENT_LOCATION_TAG ? "black" : "gray"}
          />
        </button>

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
