"use client";

import HeaderCategorys from "@/components/layout/HeaderCategorys";
import SearchBar from "@/components/layout/SearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchMobile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const popup = searchParams.get("popup");
    setIsOpen(popup === "true");
  }, [searchParams]);

  const handleClosePopup = () => {
    setIsOpen(false);
    router.replace("/search"); // URL에서 popup 쿼리 제거
  };

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
