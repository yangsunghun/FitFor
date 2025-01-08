"use client";

import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Masonry from "react-layout-masonry";

interface MasonryLayoutProps {
  posts: PostType[];
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ posts }) => {
  return (
    <section>
      <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={16} className="flex">
        {posts.map((item) => (
          <div key={item.id} className="masonry-item group relative">
            <Link href={`/detail/${item.id}`} className="click-box z-20"></Link>
            <figure className="relative w-full">
              <Image src={item.thumbnail || sampleImage} alt={item.title} width={500} height={500} />
            </figure>
            <div className="click-box bg-black p-4 text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100">
              <p>{item.title}</p>
              <p>
                <span>조회수: {item.view}</span>
              </p>
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default MasonryLayout;