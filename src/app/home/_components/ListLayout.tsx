"use client";

import Listpost from "@/components/shared/ListPost";
import ListSkeleton from "@/components/shared/ListSkeleton";
import type { PostType } from "@/lib/types/post";

type ListLayoutProps = {
  posts: PostType[];
  isPending: boolean;
};

const ListLayout = ({ posts, isPending }: ListLayoutProps) => {
  return (
    <>
      <ul>
        {isPending
          ? [...Array(3)].map((_, index) => <ListSkeleton key={index} />)
          : posts.map((post) => <Listpost key={post.id} post={post} />)}
      </ul>
    </>
  );
};

export default ListLayout;
