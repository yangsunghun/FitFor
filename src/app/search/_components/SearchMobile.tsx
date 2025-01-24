"use client";

import HeaderCategorys from "@/components/layout/HeaderCategorys";
import SearchBar from "@/components/layout/SearchBar";
import usePopupState from "@/lib/hooks/search/usePopupState";

const SearchMobile = () => {
  const { isOpen, closePopup } = usePopupState();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 h-screen w-screen bg-bg-01">
          <SearchBar />
          <HeaderCategorys />
        </div>
      )}
    </>
  );
};

export default SearchMobile;
