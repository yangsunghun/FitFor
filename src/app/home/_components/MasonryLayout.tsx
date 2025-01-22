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
    480: 3
  };

  return isPending ? (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-6 tb:gap-4 mb:gap-2"
      columnClassName="flex flex-col gap-6 tb:gap-4 mb:gap-2"
    >
      <div className="skeleton-effect aspect-[6/9] rounded-2xl"></div>
      <div className="skeleton-effect aspect-square rounded-2xl"></div>
      <div className="skeleton-effect aspect-[6/9] rounded-2xl"></div>
      <div className="skeleton-effect aspect-square rounded-2xl"></div>
      <div className="skeleton-effect aspect-square rounded-2xl"></div>
      <div className="skeleton-effect aspect-[6/9] rounded-2xl"></div>
      <div className="skeleton-effect aspect-square rounded-2xl"></div>
      <div className="skeleton-effect aspect-[6/9] rounded-2xl"></div>
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
