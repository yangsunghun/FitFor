"use client";

import { useSearchBar } from "@/lib/hooks/search/useSearchBar";
import { MagnifyingGlass } from "@phosphor-icons/react";

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
    clearSearchHistory
  } = useSearchBar();

  return (
    <div className="w-[40%] max-w-[30rem]">
      <form
        onSubmit={handleSearchWithHistory}
        className="relative flex w-full flex-row items-center rounded-lg bg-bg-02 pl-6"
      >
        <button type="submit">
          <MagnifyingGlass size={24} className="text-text-03" />
        </button>
        <input
          type="search"
          placeholder="어떤 룩을 찾으시나요?"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          className="h-12 w-full bg-transparent pl-2 text-title2 font-medium outline-none placeholder:text-text-03"
        />
        {showDropdown && (filteredTags.length > 0 || searchHistory.length > 0) && (
          <ul className="searchbar-shadow absolute left-0 top-[calc(100%+0.75rem)] z-10 w-full rounded-2xl bg-white p-6">
            {/* 검색 기록 */}
            {searchHistory.length > 0 && (
              <>
                <li className="flex justify-between py-2">
                  <strong className="text-title2">최근 검색어</strong>
                  <button className="text-text-03" onClick={clearSearchHistory}>
                    기록 삭제
                  </button>
                </li>
                <li className="my-2 h-[1px] w-full bg-line-02"></li>
                {searchHistory.map((query, index) => (
                  <li key={index} onClick={() => handleSelectHistory(query)} className="py-2 text-title2 text-text-03">
                    {query}
                  </li>
                ))}
              </>
            )}
            {/* 자동완성(태그 중에서) */}
            {filteredTags.length > 0 && (
              <>
                <li className="">추천 태그</li>
                {filteredTags.map((tag) => (
                  <li key={tag} onClick={() => handleSelectTag(tag)}>
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
