import MobileHeader from "@/components/layout/MoblieHeader";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { SlidersHorizontal } from "@phosphor-icons/react";
import clsx from "clsx";
import { memo } from "react";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const LocationFilterMoblie = memo(({ setIsOpen }: Props) => {
  const { activeLocation, setActiveLocation } = useLocationQuery();
  return (
    <>
      <MobileHeader pageName="지역" action="navigate" path="/home" />
      <div className="flex min-h-[48px] w-full items-start justify-between">
        <div className="flex flex-wrap gap-2">
          {activeLocation && (
            <div className="flex items-center gap-1 rounded-[4px] border border-line-02 px-[8px] py-[4px] text-caption text-text-03">
              <span>{activeLocation}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className={clsx("flex h-[28px] w-[28px] items-center justify-center rounded-[6px]", {
            "border border-line-02 text-text-03": !activeLocation,
            "border-none bg-primary-default text-text-01": activeLocation
          })}
        >
          <SlidersHorizontal size={20} weight="fill" />
        </button>
      </div>
    </>
  );
});

LocationFilterMoblie.displayName = "LocationFilterMoblie";

export default LocationFilterMoblie;
