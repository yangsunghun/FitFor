import { TAG_GROUPS } from "@/lib/constants/constants";
import { useSearchQuery } from "@/lib/hooks/search/useSearchQuery";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { extractUnicode } from "@/lib/utils/common/extractUnicode";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

export const useSearchBar = () => {
  const router = useRouter();
  const { inputValue, setInputValue, handleSearch } = useSearchQuery();
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
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

  // 입력값 변경 처리 연관검색
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim() !== "") {
      const chosungInput = extractUnicode(value); // 입력값의 초성 추출
      const filtered = allTags.filter((tag) => {
        const tagChosung = extractUnicode(tag); // 태그의 초성 추출
        return (
          tag.toLowerCase().includes(value.toLowerCase()) || // 일반 검색
          tagChosung.includes(chosungInput) // 초성 검색
        );
      });
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
    const updatedUrl = `/search?query=${encodeURIComponent(tag)}&page=1`;
    router.replace(updatedUrl);
  };

  // 검색 실행
  const handleSearchWithHistory = (e: FormEvent<HTMLFormElement>) => {
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
    setSelectedCategory(null);
    setInputValue(query);
    setShowDropdown(false);
    const updatedUrl = `/search?query=${encodeURIComponent(query)}&page=1`;
    router.replace(updatedUrl);
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
    clearSearchHistory,
    setSearchHistory
  };
};
