"use client";

import sampleImage from "@/assets/images/image_sample.png";
import type { PostType } from "@/lib/types/post";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-layout-masonry";

type MasonryLayoutProps = {
  posts: PostType[];
};

const MasonryLayout = ({ posts }: MasonryLayoutProps) => {
  return (
    <>
      <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={16} className="flex">
        {posts.map((item) => (
          <div key={item.id} className="masonry-item group relative">
            <Link href={`/detail/${item.id}/view`} className="click-box z-20"></Link>
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
    </>
  );
};

export default MasonryLayout;
