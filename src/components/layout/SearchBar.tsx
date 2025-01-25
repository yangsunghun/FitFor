"use client";

import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useSearchBar } from "@/lib/hooks/search/useSearchBar";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import type { FocusEvent, FormEvent } from "react";

const SearchBar = () => {
  const {
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
  } = useSearchBar();

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSearchWithHistory(e);
    setShowDropdown(false);
  };

  const handleInputBlur = (e: FocusEvent<HTMLFormElement>) => {
    setTimeout(() => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget || !relatedTarget.closest(".dropdown")) {
        setShowDropdown(false); // 드롭다운 외부 클릭 시 닫기
      }
    }, 200);
  };

  // 검색 기록 삭제
  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="w-[calc(100%-30rem)] max-w-[30rem] tb:w-full tb:max-w-full tb:bg-primary-default tb:px-[4.275%] tb:py-[16px]">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-row items-center rounded-lg bg-bg-02 pl-6 tb:bg-bg-01 tb:px-[12px]"
        onBlur={handleInputBlur}
        onFocus={() => setShowDropdown(true)} // 클릭 시 드롭다운 열림
      >
        <button type="submit">
          <MagnifyingGlass size={isTabletOrSmaller ? 20 : 24} className="text-text-03" />
        </button>
        <input
          type="search"
          placeholder="어떤 룩을 찾으시나요?"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="h-12 w-full bg-transparent px-2 text-title2 font-medium outline-none placeholder:text-text-03 tb:h-[44px] tb:text-body tb:text-text-03"
        />
        {showDropdown && (filteredTags.length > 0 || searchHistory.length > 0) && (
          <ul className="dropdown shadow-emphasize absolute left-0 top-[calc(100%+0.75rem)] z-50 min-h-[360px] w-full rounded-2xl bg-white p-6 tb:left-[-4.55%] tb:top-[calc(100%+17px)] tb:w-screen tb:rounded-none tb:p-0 tb:shadow-none">
            {/* 검색 기록 */}
            {searchHistory.length > 0 && inputValue.length === 0 && (
              <>
                <li className="tb:inner flex items-center justify-between py-2 tb:h-[55px] tb:p-0">
                  <strong className="text-title2 tb:mt-[1px] tb:text-body tb:font-medium">최근 검색어</strong>
                  <button
                    className="text-text-03 tb:text-caption"
                    onClick={(e) => {
                      e.preventDefault();
                      clearSearchHistory();
                    }}
                  >
                    전체 삭제
                  </button>
                </li>
                <li className="my-2 h-[1px] w-full bg-line-02 tb:my-0"></li>
                {searchHistory.map((query, index) => (
                  <li
                    key={index}
                    className="tb:inner flex cursor-pointer justify-between py-2 text-title2 text-text-03 tb:h-[55px] tb:p-0 tb:text-body tb:font-medium"
                  >
                    <button onClick={() => handleSelectHistory(query)} className="ellip1 flex-1 text-left">
                      {query}
                    </button>
                    <button
                      className="font-bold text-text-03"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteHistoryItem(index);
                      }}
                    >
                      <X size={16} weight="bold" />
                    </button>
                  </li>
                ))}
              </>
            )}
            {/* 자동완성(태그 중에서) */}
            {filteredTags.length > 0 && (
              <>
                <li className="tb:inner flex items-center justify-between py-2 tb:h-[55px] tb:p-0">
                  <strong className="text-title2 tb:mt-[1px] tb:text-body tb:font-medium">연관 검색어</strong>
                </li>
                <li className="my-2 h-[1px] w-full bg-line-02 tb:my-0"></li>
                {filteredTags.map((tag) => (
                  <li
                    key={tag}
                    className="tb:inner flex cursor-pointer justify-between py-2 text-title2 text-text-03 tb:h-[55px] tb:p-0 tb:text-body tb:font-medium"
                  >
                    <button
                      onClick={() => {
                        handleSelectTag(tag);
                        setShowDropdown(false);
                      }}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </>
            )}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
