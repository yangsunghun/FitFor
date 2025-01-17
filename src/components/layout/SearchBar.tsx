"use client";

import { useSearchBar } from "@/lib/hooks/search/useSearchBar";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSearchWithHistory(e);
    setShowDropdown(false);
  };

  // 검색 기록 삭제
  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="w-[40%] max-w-[30rem]">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-row items-center rounded-lg bg-bg-02 pl-6"
        onFocus={() => setShowDropdown(true)} // 클릭 시 드롭다운 열림
      >
        <button type="submit">
          <MagnifyingGlass size={24} className="text-text-03" />
        </button>
        <input
          type="search"
          placeholder="어떤 룩을 찾으시나요?"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={(e) => {
            const relatedTarget = e.relatedTarget as HTMLElement;
            if (!relatedTarget || !relatedTarget.closest(".dropdown")) {
              setShowDropdown(false); // 드롭다운 외부 클릭 시 닫기
            }
          }}
          className="h-12 w-full bg-transparent px-2 text-title2 font-medium outline-none placeholder:text-text-03"
        />
        {showDropdown && (filteredTags.length > 0 || searchHistory.length > 0) && (
          <ul className="dropdown searchbar-shadow absolute left-0 top-[calc(100%+0.75rem)] z-50 w-full rounded-2xl bg-white p-6">
            {/* 검색 기록 */}
            {searchHistory.length > 0 && inputValue.length === 0 && (
              <>
                <li className="flex items-center justify-between py-2">
                  <strong className="text-title2">최근 검색어</strong>
                  <button
                    className="text-text-03"
                    onClick={(e) => {
                      e.preventDefault();
                      clearSearchHistory();
                    }}
                  >
                    전체 삭제
                  </button>
                </li>
                <li className="my-2 h-[1px] w-full bg-line-02"></li>
                {searchHistory.map((query, index) => (
                  <li key={index} className="flex cursor-pointer justify-between py-2 text-title2 text-text-03">
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
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </>
            )}
            {/* 자동완성(태그 중에서) */}
            {filteredTags.length > 0 && (
              <>
                <li className="flex justify-between py-2">
                  <strong className="text-title2">연관 검색어</strong>
                </li>
                <li className="my-2 h-[1px] w-full bg-line-02"></li>
                {filteredTags.map((tag) => (
                  <li
                    key={tag}
                    onClick={() => {
                      handleSelectTag(tag);
                      setShowDropdown(false); // 자동완성 클릭 시 닫기
                    }}
                    className="cursor-pointer py-2 text-title2 text-text-03"
                  >
                    {tag}
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
