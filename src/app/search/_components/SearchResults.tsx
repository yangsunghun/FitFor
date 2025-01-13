import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

type SearchResultsProps = {
  Results: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
  error: any;
};

const SearchResults = ({ Results, isPending, error }: SearchResultsProps) => {
  if (isPending) return <p>로딩</p>;
  if (error) return <p>검색에 문제가 있습니다 {error.message}</p>;

  if (!Results || Results.items.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <ul className="grid grid-cols-4 gap-5">
      {Results.items.map((post) => (
        <li key={post.id} className="relative">
          <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
          <figure className="relative h-[250px] w-full overflow-hidden bg-gray-200">
            <Image
              src={post.thumbnail || sampleImage}
              alt={post.title}
              width={300}
              height={300}
              className="object-cover"
            />
          </figure>

          <p className="text-lg font-bold">{post.title}</p>
          <p className="text-sm text-gray-500">작성자: {post.users?.nickname || "익명"}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;