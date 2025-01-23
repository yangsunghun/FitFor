import GridPost from "@/components/shared/GridPost";
import GridSkeleton from "@/components/shared/GridSkeleton";
import type { PostType } from "@/lib/types/post";

type SearchResultsProps = {
  Results: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
};

const SearchResults = ({ Results, isPending }: SearchResultsProps) => {
  if (!Results || Results.items.length === 0)
    return <p className="mt-32 text-center text-subtitle font-medium text-text-02">검색 결과가 없습니다.</p>;

  return (
    <ul className="grid grid-cols-4 gap-6 mb:grid-cols-2 tb:grid-cols-3 tb:gap-[12px]">
      {isPending
        ? [...Array(8)].map((_, index) => <GridSkeleton key={index} />)
        : Results.items.map((post) => <GridPost key={post.id} post={post} />)}
    </ul>
  );
};

export default SearchResults;
