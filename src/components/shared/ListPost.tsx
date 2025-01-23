import sampleImage from "@/assets/images/image_sample.png";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import type { PostType } from "@/lib/types/post";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tags } from "../ui/Tags";
import LikeSection from "./LikeSection";

type Props = {
  post: PostType;
};

const Listpost = ({ post }: Props) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <li className="relative mb-6 flex gap-6 py-4 mb:mb-[24px] mb:justify-between mb:gap-0 mb:py-0">
      <Link href={`/detail/${post.id}/view`} className="click-box z-10"></Link>
      <figure className="thumbnail aspect-square w-[11.25rem] rounded-2xl bg-gray-200 tb:w-[150px] tb:rounded-lg mb:w-[109px]">
        <Image
          src={isImgError ? sampleImage : post.images[0]}
          alt={post.content}
          fill={true}
          placeholder="blur"
          blurDataURL={post.thumbnail_blur_url}
          onError={() => setIsImgError(true)}
        />
      </figure>

      <div className="relative w-[calc(100%-12.75rem)] mb:w-[calc(100%-130px)]">
        <div className="flex items-center gap-4 tb:hidden">
          <figure className="relative h-10 w-10 overflow-hidden rounded-full border border-line-02">
            <Image
              src={post.users.profile_image || sampleImage}
              alt={`${post.users.nickname || "익명"}의 프로필 이미지`}
              fill
              className="object-cover"
            />
          </figure>
          <div>
            <p className="text-title2 font-bold">{post.users.nickname || "익명"}</p>
            <p className="text-text-03">{relativeTimeDay(post.created_at)}</p>
          </div>
        </div>

        <p className="clear-both mt-2 line-clamp-2 overflow-hidden text-ellipsis break-words text-subtitle font-medium text-text-04 tb:mt-0 tb:text-title2 mb:text-caption">
          {post.content}
        </p>

        <div className="absolute bottom-0 right-0 z-20 flex gap-4 text-title2 font-medium leading-7 text-text-03 tb:left-0 tb:right-auto tb:text-body mb:text-caption">
          <LikeSection postId={post.id} styleType="list" />
          <span className="post-center pointer-events-none flex items-center gap-1">
            {isTabletOrSmaller ? (
              <ChatCircleDots size={16} className="text-text-02" weight="fill" />
            ) : (
              <ChatCircleDots size={28} className="text-text-03" />
            )}

            <span>{post.comments}</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-0 flex gap-2 tb:relative tb:mt-2">
          {isTabletOrSmaller
            ? post.tags.slice(0, 3).map((tag) => <Tags key={tag} variant="gray" size="md" label={tag} />)
            : post.tags.map((tag) => <Tags key={tag} variant="gray" size="md" label={tag} />)}
        </div>
      </div>
    </li>
  );
};

export default Listpost;
