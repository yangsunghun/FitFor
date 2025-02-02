"use client";
import Pagination from "@/app/search/_components/Pagination";
import SearchResults from "@/app/search/_components/SearchResults";
import SortPosts from "@/app/search/_components/SortPosts";
import ErrorScreen from "@/components/common/ErrorScreen";
import { useSearchPosts } from "@/lib/hooks/search/useSearchPosts";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import LocationTags from "./LocationTags";

const LocationContents = () => {
  const { query, page, tags, sort, handleSort, handleToggleTag, resetTags } = useSearchQuery();
  const { Results, isPending, isError } = useSearchPosts(query, page, Object.values(tags).flat(), sort);

  if (isError) return <ErrorScreen error={new Error("검색 데이터를 불러오는 중 에러가 발생했습니다.")} />;

  return (
    <>
      <LocationTags />
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
