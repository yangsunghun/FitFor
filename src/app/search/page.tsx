import { Suspense } from "react";
import SearchContents from "./_components/SearchContents";
import SearchMobile from "./_components/SearchMobile";

const SearchPage = () => {
  return (
    <div className="inner relative pb-40 pt-10 tb:pb-10">
      <Suspense fallback={<p></p>}>
        <SearchMobile />
        <SearchContents />
      </Suspense>
    </div>
  );
};

export default SearchPage;
