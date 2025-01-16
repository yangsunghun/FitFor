import { TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import { useEffect, useState } from "react";

export const useSearchBar = () => {
  const { inputValue, setInputValue, handleSearch } = useSearchQuery();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 모든 태그를 하나의 배열로 합침
  const allTags = TAG_GROUPS.flatMap((group) => group.tags);

  // 검색 기록 로드
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // 입력값 변경 처리
  const handleInputChange = (value: string) => {
    setInputValue(value);

    // 입력값을 기준으로 태그 필터링
    if (value.trim() !== "") {
      const filtered = allTags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase()));
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }

    setShowDropdown(true);
  };

  // 자동완성 태그 클릭
  const handleSelectTag = (tag: string) => {
    setInputValue(tag);
    setShowDropdown(false);
  };

  // 검색 실행
  const handleSearchWithHistory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색 기록 저장
    if (inputValue.trim() !== "" && !searchHistory.includes(inputValue)) {
      const updatedHistory = [inputValue, ...searchHistory].slice(0, 5); // 최대 5개로 제한
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    handleSearch(e); // 기존 검색 실행
  };

  // 검색 기록 항목 클릭
  const handleSelectHistory = (query: string) => {
    setInputValue(query);
    setShowDropdown(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return {
    inputValue,
    showDropdown,
    filteredTags,
    searchHistory,
    setShowDropdown,
    handleInputChange,
    handleSelectTag,
    handleSearchWithHistory,
    handleSelectHistory,
    clearSearchHistory
  };
};
