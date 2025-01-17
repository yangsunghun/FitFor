"use client";

import Cardpost from "@/components/shared/CardPost";
import type { PostType } from "@/lib/types/post";
import Masonry from "react-layout-masonry";

type MasonryLayoutProps = {
  posts: PostType[];
};

const MasonryLayout = ({ posts }: MasonryLayoutProps) => {
  return (
    <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={24} className="flex">
      {posts.map((post) => (
        <Cardpost key={post.id} post={post} isMasonry={true} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
