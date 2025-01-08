"use client";

import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import React from "react";

interface ListLayoutProps {
  posts: PostType[];
}

const ListLayout: React.FC<ListLayoutProps> = ({ posts }) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">List Layout</h2>
      <ul className="flex flex-wrap gap-5">
        {posts &&
          posts.map((item) => (
            <li key={item.id} className="flex w-[48%] items-center gap-10">
              <figure className="relative h-[150px] w-[150px] overflow-hidden bg-gray-200">
                <Image src={item.thumbnail || sampleImage} alt={item.title} width={150} height={150} />
              </figure>
              <div>
                <p>{item.title}</p>
                <p>{item.season_tag?.join("")}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ListLayout;
