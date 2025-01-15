"use client";

import ListItem from "@/components/shared/ListItem";
import type { PostType } from "@/lib/types/post";

type ListLayoutProps = {
  posts: PostType[];
};

const ListLayout = ({ posts }: ListLayoutProps) => {
  return (
    <>
      <ul>
        {posts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default ListLayout;
