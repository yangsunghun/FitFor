"use client";

import HeaderCategorys from "@/components/layout/HeaderCategorys";
import SearchBar from "@/components/layout/SearchBar";
import useLockScroll from "@/lib/hooks/common/useLockScroll";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchMobile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const popup = searchParams.get("popup");
    setIsOpen(popup === "true");
  }, [searchParams]);

  useLockScroll(isOpen);

  const handleClosePopup = () => {
    setIsOpen(false);
    router.replace("/search");
  };

  return (
    <>
      {isOpen && isTabletOrSmaller && (
        <div className="fixed inset-0 z-40 h-screen w-screen bg-bg-01">
          <SearchBar />
          <HeaderCategorys />
        </div>
      )}
    </>
  );
};

export default SearchMobile;
