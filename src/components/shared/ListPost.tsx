import type { PostType } from "@/lib/types/post";
import { formatDate } from "@/lib/utils/common/formatDateTime";
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
      <figure className="thumbnail h-[11.25rem] w-[11.25rem] bg-gray-200">
        <Image src={post.thumbnail} alt={post.title} fill={true} />
      </figure>

      <div className="relative w-[calc(100%-12.75rem)]">
        <div className="flex gap-2">
          {post.tags.map((tag, index) => (
            <Tags key={index} variant="primary" size="md" label={tag} />
          ))}
        </div>
        <p className="clear-both mt-2 line-clamp-2 overflow-hidden text-ellipsis break-words text-title1 font-bold text-text-04">
          {post.title}
        </p>
        <div className="absolute bottom-0 left-0 z-20 flex gap-4 text-title2 font-medium leading-7">
          <LikeSection postId={post.id} styleType="list" />
          <span className="post-center pointer-events-none flex gap-1">
            <ChatCircleDots size={28} className="text-text-03" />
            {post.comments}
          </span>
        </div>
        <p className="absolute bottom-4 right-4 flex gap-1">
          <span>조회수: {post.view}</span>
          <span>·</span>
          <span>{formatDate(post.created_at)}</span>
        </p>
      </div>
    </li>
  );
};

export default Listpost;
