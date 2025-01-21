import { Suspense } from "react";
import SearchContents from "./_components/SearchContents";

const SearchPage = () => {
  return (
    <div className="inner pb-40">
      <Suspense fallback={<p></p>}>
        <SearchContents />
      </Suspense>
    </div>
  );
};

export default SearchPage;
