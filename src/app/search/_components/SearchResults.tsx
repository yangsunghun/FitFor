import GridPost from "@/components/shared/GridPost";
import GridSkeleton from "@/components/shared/GridSkeleton";
import type { PostType } from "@/lib/types/post";

type SearchResultsProps = {
  Results: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
  isError: any;
};

const SearchResults = ({ Results, isPending, isError }: SearchResultsProps) => {
  if (isError) return <p>검색에 문제가 있습니다</p>;

  if (!Results || Results.items.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <ul className="grid grid-cols-4 gap-6">
      {isPending
        ? [...Array(8)].map((_, index) => <GridSkeleton key={index} />)
        : Results.items.map((post) => <GridPost key={post.id} post={post} />)}
    </ul>
  );
};

export default SearchResults;
