type SearchFormProps = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({ inputValue, setInputValue, onSearch }: SearchFormProps) => (
  <form onSubmit={onSearch} className="mb-6 flex gap-4">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} // 입력 필드만 업데이트
      placeholder="검색어를 입력하세요"
      className="flex-1 rounded border p-2"
    />
    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
      검색
    </button>
  </form>
);

export default SearchForm;
