import BookmarkButton from "@/app/detail/_components/ButtonBookmark";
import LikeButton from "@/app/detail/_components/ButtonLike";
import VerifiedBadge from "@/app/mypage/_components/VerifiedBadge";
import sampleImage from "@/assets/images/image_sample.png";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import type { PostType } from "@/lib/types/post";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileImageCircle from "./ProfileImageCircle";

type Props = {
  post: PostType;
  isMasonry?: boolean;
};

const Cardpost = ({ post, isMasonry }: Props) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const imageProps = isMasonry ? { width: 500, height: 700 } : { fill: true };
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={clsx(
        "masonry-post group relative overflow-hidden rounded-2xl mb:rounded-lg",
        isMasonry || "aspect-square"
      )}
    >
      <Link href={`/detail/${post.id}${isTabletOrSmaller ? "" : "/view"}`} className="click-box z-20"></Link>
      <figure className="relative h-full w-full">
        <Image
          src={isImgError ? sampleImage : post.images[0]}
          alt={post.content}
          {...imageProps}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL={post.thumbnail_blur_url}
          onError={() => setIsImgError(true)}
        />
      </figure>
      <div className="click-box bg-black p-4 text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100 tb:hidden">
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          <LikeButton postId={post.id} styleType="masonry" iconSize={20} />
          <BookmarkButton postId={post.id} styleType="masonry" iconSize={20} />
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <figure className="relative">
            <ProfileImageCircle
              profileImage={post.users.profile_image}
              nickname={post.users.nickname}
              size={28}
              className="h-7 w-7"
            />
            <VerifiedBadge isVerified={post.users.is_verified || false} />
          </figure>
          <p className="text-text-01">{post.users.nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default Cardpost;
