"use client";

import Pagination from "@/app/search/_components/Pagination";
import SearchResults from "@/app/search/_components/SearchResults";
import SortPosts from "@/app/search/_components/SortPosts";
import ErrorScreen from "@/components/common/ErrorScreen";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import { useLocationPosts } from "@/lib/hooks/location/useSearchPosts";
import LocationTags from "./LocationTags";

const LocationContents = () => {
  const { query, page, sort, handleSort } = useLocationQuery();
  const { Results, isPending, isError } = useLocationPosts(query, page, sort);

  if (isError) return <ErrorScreen error={new Error("검색 데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <section className="mb-10">
        <LocationTags />
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
    </>
  );
};

export default LocationContents;
