"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { Tags } from "@/components/ui/Tags";
import type { PostType } from "@/lib/types/post";
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
          <li key={item.id} className="relative mb-6 flex gap-10">
            <Link href={`/detail/${item.id}/view`} className="click-box z-20"></Link>
            <figure className="relative h-[11.25rem] w-[11.25rem] overflow-hidden rounded-[1rem] bg-gray-200">
              <Image src={item.thumbnail} alt={item.title} fill={true} className="object-cover object-center" />
            </figure>
            <div>
              <div className="flex gap-2">
                {item.tags.map((tag) => (
                  <Tags variant="primary" size="md" label={tag} />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-[40px] w-[40px] items-center overflow-hidden rounded-full border-2 bg-gray-100">
                  <Image
                    src={item.users.profile_image || sampleImage}
                    alt={`${item.users.nickname}의 프로필 이미지`}
                    fill={true}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <p>{item.users.nickname}</p>
              </div>
              <p>{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListLayout;
