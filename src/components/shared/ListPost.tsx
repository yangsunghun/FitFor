import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Tags } from "../ui/Tags";
import LikeSection from "./LikeSection";

type Props = {
  post: PostType;
};

const Listpost = ({ post }: Props) => {
  return (
    <li className="relative mb-6 flex gap-6 py-4">
      <Link href={`/detail/${post.id}/view`} className="click-box z-20"></Link>
      <figure className="thumbnail h-[11.25rem] w-[11.25rem] rounded-2xl bg-gray-200">
        <Image src={post.images[0]} alt={post.content} fill={true} />
      </figure>

      <div className="relative w-[calc(100%-12.75rem)]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
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
        </div>

        <p className="clear-both mt-2 line-clamp-2 overflow-hidden text-ellipsis break-words text-subtitle font-medium text-text-04">
          {post.content}
        </p>

        <div className="absolute bottom-0 right-0 flex gap-4 text-title2 font-medium leading-7 text-text-03">
          <LikeSection postId={post.id} styleType="list" />
          <span className="post-center pointer-events-none flex gap-1">
            <ChatCircleDots size={28} className="text-text-03" />
            <span>{post.comments}</span>
          </span>
        </div>

        <div className="absolute bottom-0 left-0 flex gap-2">
          {post.tags.map((tag) => (
            <Tags key={tag} variant="gray" size="md" label={tag} />
          ))}
        </div>
      </div>
    </li>
  );
};

export default Listpost;
