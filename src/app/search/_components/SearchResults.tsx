import sampleImage from "@/assets/images/image_sample.png";
import { Tags } from "@/components/ui/Tags";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";

type SearchResultsProps = {
  Results: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
  isError: any;
};

const SearchResults = ({ Results, isPending, isError }: SearchResultsProps) => {
  if (isPending) return <p>로딩</p>;
  if (isError) return <p>검색에 문제가 있습니다 {isError.message}</p>;

  if (!Results || Results.items.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <ul className="grid grid-cols-4 gap-6">
      {Results.items.map((post) => (
        <li key={post.id} className="relative mb-4">
          <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
          <figure className="thumbnail aspect-square rounded-2xl">
            <Image src={post.images[0] || sampleImage} alt={post.content} fill={true} />
          </figure>

          <p className="ellip2 mt-4 text-title2 font-medium">{post.content}</p>
          <div className="mt-3">
            {post.tags.map((tag, index) => (
              <Tags key={index} variant="grayLine" size="md" label={tag} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
