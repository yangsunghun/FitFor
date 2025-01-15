"use client";

import Listpost from "@/components/shared/ListPost";
import type { PostType } from "@/lib/types/post";

type ListLayoutProps = {
  posts: PostType[];
};

const ListLayout = ({ posts }: ListLayoutProps) => {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <Listpost key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default ListLayout;
