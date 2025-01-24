"use client";

import HeaderCategorys from "@/components/layout/HeaderCategorys";
import SearchBar from "@/components/layout/SearchBar";
import { Suspense, useEffect, useRef, useState } from "react";

const SearchMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const popup = params.get("popup");
    setIsOpen(popup === "true");
  }, []);

  useEffect(() => {
    if (!bodyRef.current) {
      bodyRef.current = document.body;
    }

    if (isOpen) {
      bodyRef.current.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      bodyRef.current.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 h-screen w-screen bg-bg-01">
          <Suspense>
            <SearchBar />
            <HeaderCategorys />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default SearchMobile;
