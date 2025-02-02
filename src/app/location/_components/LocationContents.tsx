"use client";

import Pagination from "@/app/search/_components/Pagination";
import SearchResults from "@/app/search/_components/SearchResults";
import SortPosts from "@/app/search/_components/SortPosts";
import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import ErrorScreen from "@/components/common/ErrorScreen";
import SlideOver from "@/components/ui/SlideOver";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { useLocationPosts } from "@/lib/hooks/location/useSearchPosts";
import { useState } from "react";
import LocationCheck from "./LocationCheck";
import LocationFilterMoblie from "./LocationFilterMoblie";
import LocationTags from "./LocationTags";

const LocationContents = () => {
  const { query, page, sort, handleSort } = useLocationQuery();
  const { Results, isPending, isError } = useLocationPosts(query, page, sort);

  const [isOpen, setIsOpen] = useState(false);

  if (isError) return <ErrorScreen error={new Error("검색 데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <section>
        <MinTablet>
          <LocationTags />
        </MinTablet>
        <Tablet>
          <LocationFilterMoblie setIsOpen={setIsOpen} />
        </Tablet>
      </section>
      <div className="relative mb-10 flex items-center justify-between tb:mb-0 tb:h-[48px]">
        <p>
          총 <b>{Results?.total}</b>개
        </p>
        <SortPosts sort={sort} handleSort={handleSort} />
      </div>

      <section>
        <SearchResults Results={Results} isPending={isPending} />
      </section>
      <Pagination Results={Results} />

      <Tablet>
        {isOpen && (
          <SlideOver title="필터" onClose={() => setIsOpen(false)}>
            <LocationCheck onClose={() => setIsOpen(false)} />
          </SlideOver>
        )}
      </Tablet>
    </>
  );
};

export default LocationContents;
