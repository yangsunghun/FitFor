import { Suspense } from "react";
import SearchContents from "./_components/SearchContents";

const SearchPage = () => {
  return (
    <div className="inner pb-40 pt-10 tb:pb-10">
      <div className="absolute left-0 top-20 z-50 h-2 w-full bg-bg-01"></div>
      <Suspense fallback={<p></p>}>
        <SearchContents />
      </Suspense>
    </div>
  );
};

export default SearchPage;
