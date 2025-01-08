"use client";

import sampleImage from "@/assets/images/image_sample.png";
import type { Post } from "@/lib/types/post";
import Image from "next/image";
import React from "react";
import Masonry from "react-layout-masonry";

interface MasonryLayoutProps {
  posts: Post[];
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ posts }) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Masonry Layout</h2>
      <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={16} className="flex">
        {posts.map((item) => (
          <div key={item.id} className="masonry-item">
            <figure className="relative w-full">
              <Image src={item.thumbnail || sampleImage} alt={item.title} width={500} height={500} />
            </figure>
            <div>
              <p>{item.title}</p>
              <p>
                <span>조회수: {item.view}</span> <span>{item.created_at}</span>
              </p>
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default MasonryLayout;
