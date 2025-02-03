"use client";
import { Button } from "@/components/ui/Button";
import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";

type Props = {
  onClose: () => void;
};

const LocationCheck = ({ onClose }: Props) => {
  const { activeLocation, setActiveLocation } = useLocationQuery();
  const CURRENT_LOCATION_TAG = "현재 내 위치";
  return (
    <>
      <div className="inner flex max-h-[380px] flex-col flex-wrap gap-4 py-4 text-caption">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={activeLocation === CURRENT_LOCATION_TAG || false}
            onChange={() => setActiveLocation(CURRENT_LOCATION_TAG)}
            className="h-[16px] w-[16px] rounded-[4px] accent-primary-default opacity-40 checked:opacity-100"
          />
          <span className="text-sm">{CURRENT_LOCATION_TAG}</span>
        </label>
        {REGIONS_WITH_QUERY.map((tag) => (
          <label key={tag.title} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={activeLocation === tag.query || false}
              onChange={() => setActiveLocation(tag.query)}
              className="h-[16px] w-[16px] rounded-[4px] accent-primary-default opacity-40 checked:opacity-100"
            />
            <span className="text-sm">{tag.title}</span>
          </label>
        ))}
      </div>

      <div className="inner">
        <Button onClick={onClose} className="text-text-body w-full" variant={activeLocation ? "primary" : "disabled"}>
          저장하기
        </Button>
      </div>
    </>
  );
};

export default LocationCheck;
