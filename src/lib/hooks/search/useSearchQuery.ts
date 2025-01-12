"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSearchQuery = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(inputValue.trim())}&page=1`);
    }
  };

  return {
    inputValue,
    setInputValue,
    handleSearch,
  };
};
