"use client";

import Cardpost from "@/components/shared/CardPost";
import type { PostType } from "@/lib/types/post";
import Masonry from "react-masonry-css";

type MasonryLayoutProps = {
  posts: PostType[];
  isPending: boolean;
};

const MasonryLayout = ({ posts, isPending }: MasonryLayoutProps) => {
  const breakpointColumnsObj = {
    default: 4,
    1200: 4,
    768: 3
  };

  const aspectRatios = ["aspect-[6/9]", "aspect-square"];

  return isPending ? (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-6 tb:gap-4 mb:gap-2"
      columnClassName="flex flex-col gap-6 tb:gap-4 mb:gap-2"
    >
      {[...Array(16)].map((_, index) => (
        <div key={index} className={`skeleton-effect rounded-2xl ${aspectRatios[index % aspectRatios.length]}`}></div>
      ))}
    </Masonry>
  ) : (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-6 tb:gap-4 mb:gap-2"
      columnClassName="flex flex-col gap-6 tb:gap-4 mb:gap-2"
    >
      {posts.map((post) => (
        <Cardpost key={post.id} post={post} isMasonry={true} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
