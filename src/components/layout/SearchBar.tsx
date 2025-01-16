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
    <div className="max-w-xl flex-1 items-center justify-center">
      <form
        onSubmit={handleSearchWithHistory}
        className="relative flex w-full flex-row items-center rounded-2xl bg-bg-02 pl-6"
      >
        <button type="submit">
          <MagnifyingGlass size={24} className="text-text-03" />
        </button>
        <input
          type="search"
          placeholder="태그를 검색하세요"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          className="h-14 w-full bg-transparent pl-2 text-title2 font-medium outline-none placeholder:text-text-03"
        />
        {showDropdown && (filteredTags.length > 0 || searchHistory.length > 0) && (
          <ul className="absolute left-0 top-full z-10 w-full bg-white shadow-md">
            {/* 검색 기록 */}
            {searchHistory.length > 0 && (
              <>
                <li>검색 기록</li>
                <li>
                  <button onClick={clearSearchHistory}>기록 삭제</button>
                </li>
                {searchHistory.map((query, index) => (
                  <li key={index} onClick={() => handleSelectHistory(query)}>
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
