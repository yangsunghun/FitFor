"use client";

import Cardpost from "@/components/shared/CardPost";
import type { PostType } from "@/lib/types/post";
import Masonry from "react-layout-masonry";

type MasonryLayoutProps = {
  posts: PostType[];
  isPending: boolean;
};

const MasonryLayout = ({ posts, isPending }: MasonryLayoutProps) => {
  return isPending ? (
    <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={24} className="flex">
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
    <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={24} className="flex">
      {posts.map((post) => (
        <Cardpost key={post.id} post={post} isMasonry={true} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
