type TagsFilterProps = {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

const TagsFilter = ({ tags, selectedTags, onToggleTag }: TagsFilterProps) => {
  return (
    <ul className="my-10 flex gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <button
            onClick={() => onToggleTag(tag)}
            className={`rounded-full border px-[15px] ${
              selectedTags.includes(tag) ? "bg-blue-500 text-white" : "border-gray-500"
            }`}
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TagsFilter;
