import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import LikeSection from "./LikeSection";

type Props = {
  post: PostType;
  isMasonry?: boolean;
};

const Cardpost = ({ post, isMasonry }: Props) => {
  return (
    <div className={clsx("relative overflow-hidden rounded-[1rem]", isMasonry && "masonry-post group")}>
      <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
      <figure className="relative w-full">
        <Image src={post.thumbnail} alt={post.title} width={500} height={700} className="object-cover object-center" />
      </figure>
      <div className="click-box bg-black p-4 text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100">
        <div className="absolute right-4 top-4 z-20">
          <LikeSection postId={post.id} styleType="masonry" />
        </div>
        <div className="posts-center absolute bottom-4 left-4 flex gap-2">
          <div className="posts-center relative h-7 w-7 overflow-hidden rounded-full bg-gray-300">
            <Image
              src={post.users.profile_image || sampleImage}
              alt={`${post.users.nickname}의 프로필 이미지`}
              fill={true}
            />
          </div>
          <p className="text-body text-text-01">{post.users.nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default Cardpost;
