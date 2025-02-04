import sampleImage from "@/assets/images/image_sample.png";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import type { PostType } from "@/lib/types/post";
import { MapPinArea } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  post: PostType;
};

const GridPostForLocation = ({ post }: Props) => {
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
          sizes="(max-width: 768px) 250px, 250px"
          placeholder="blur"
          blurDataURL={post.thumbnail_blur_url}
          onError={() => setIsImgError(true)}
        />
      </figure>

      <p className="ellip2 mt-4 text-title2 font-medium tb:mt-2 tb:text-body">{post.content}</p>
      <p className="ellip1 mt-1 text-body text-text-03 tb:text-body">
        <MapPinArea weight="fill" className="mr-1 inline-block text-primary-default" />
        {post.upload_place}
      </p>
    </li>
  );
};

export default GridPostForLocation;
