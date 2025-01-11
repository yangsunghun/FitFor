"use client";

import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ListLayoutProps = {
  posts: PostType[];
};

const ListLayout: React.FC<ListLayoutProps> = ({ posts }) => {
  return (
    <section>
      <ul className="flex flex-wrap gap-5">
        {posts.map((item) => (
          <li key={item.id} className="relative flex w-[48%] items-center gap-10">
            <Link href={`/detail/${item.id}/view`} className="click-box z-20"></Link>
            <figure className="relative h-[150px] w-[150px] overflow-hidden bg-gray-200">
              <Image src={item.thumbnail || sampleImage} alt={item.title} width={150} height={150} />
            </figure>
            <div>
              <p>{item.title}</p>
              <p>{item.tags?.join("")}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ListLayout;
