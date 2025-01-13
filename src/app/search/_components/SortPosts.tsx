const sortOptions = [
  { key: "created_at", label: "최신순" },
  { key: "likes", label: "좋아요순" },
  { key: "view", label: "조회수순" }
];

type Props = {
  sort: string;
  handleSort: (key: string) => void;
};

const SortPosts = ({ sort, handleSort }: Props) => {
  return (
    <div className="flex gap-2">
      {sortOptions.map((option) => (
        <button
          key={option.key}
          onClick={() => handleSort(option.key)}
          className={`rounded px-4 py-2 ${sort === option.key ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortPosts;
