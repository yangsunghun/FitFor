"use client";

import LikeSection from "@/app/detail/_components/LikeSection";
import { Tags } from "@/components/ui/Tags";
import type { PostType } from "@/lib/types/post";
import { formatDate } from "@/lib/utils/common/formatDateTime";
import { ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type ListLayoutProps = {
  posts: PostType[];
};

const ListLayout = ({ posts }: ListLayoutProps) => {
  return (
    <>
      <ul>
        {posts.map((item) => (
          <li key={item.id} className="relative mb-6 flex gap-6 py-4">
            <Link href={`/detail/${item.id}/view`} className="click-box z-20"></Link>
            <figure className="relative h-[11.25rem] w-[11.25rem] overflow-hidden rounded-[1rem] bg-gray-200">
              <Image src={item.thumbnail} alt={item.title} fill={true} className="object-cover object-center" />
            </figure>
            <div className="relative w-[calc(100%-12.75rem)]">
              <div className="flex gap-2">
                {item.tags.map((tag) => (
                  <Tags variant="primary" size="md" label={tag} />
                ))}
              </div>
              <p className="clear-both mt-2 line-clamp-2 overflow-hidden text-ellipsis break-words text-title1 font-bold text-text-04">
                {item.title}
              </p>
              <div className="absolute bottom-0 left-0 z-20 flex gap-4 leading-7">
                <LikeSection postId={item.id} styleType="list" />
                <span className="item-center pointer-events-none flex gap-1 font-medium">
                  <ChatCircleDots size={28} className="text-text-03" />
                  {item.comments}
                </span>
              </div>
              <p className="absolute bottom-4 right-4 flex gap-1 text-body">
                <span>조회수: {item.view}</span>
                <span>·</span>
                <span>{formatDate(item.created_at)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListLayout;
