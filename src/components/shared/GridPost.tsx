import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";
import { Tags } from "../ui/Tags";

type Props = {
  post: PostType;
};

const GridPost = ({ post }: Props) => {
  return (
    <li key={post.id} className="relative mb-4">
      <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
      <figure className="thumbnail aspect-square rounded-2xl">
        <Image src={post.images[0]} alt={post.content} fill={true} />
      </figure>

      <p className="ellip2 mt-4 text-title2 font-medium">{post.content}</p>
      <div className="mt-3 flex gap-2">
        {post.tags.map((tag) => (
          <Tags key={tag} variant="grayLine" size="md" label={tag} />
        ))}
      </div>
    </li>
  );
};

export default GridPost;
