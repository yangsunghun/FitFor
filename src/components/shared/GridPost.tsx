import sampleImage from "@/assets/images/image_sample.png";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tags } from "../ui/Tags";

type Props = {
  post: PostType;
};

const GridPost = ({ post }: Props) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <li key={post.id} className="relative mb-4">
      <Link href={`/detail/${post.id}${isTabletOrSmaller ? "" : "/view"}`} className="click-box z-10"></Link>
      <figure className="thumbnail aspect-square rounded-2xl mb:rounded-lg">
        <Image
          src={isImgError ? sampleImage : post.images[0]}
          alt={post.content}
          fill={true}
          sizes="(max-width: 768px) 200px, 200px"
          placeholder="blur"
          blurDataURL={post.thumbnail_blur_url}
          onError={() => setIsImgError(true)}
        />
      </figure>

      <p className="ellip2 mt-4 text-title2 font-medium tb:mt-2 tb:text-body">{post.content}</p>
      <div className="mt-3 flex flex-wrap gap-2 tb:mt-2 tb:gap-1">
        {post.tags.map((tag) => (
          <Tags key={tag} variant="grayLine" size="md" label={tag} />
        ))}
      </div>
    </li>
  );
};

export default GridPost;
