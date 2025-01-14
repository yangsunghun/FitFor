import { fetchPostDetail } from "@/lib/utils/post/fetchPostDetail";
import type { Metadata } from "next";
import CommentSection from "../_components/CommentSection";
import ContentsSection from "../_components/ContentsSection";
import LikeSection from "../_components/LikeSection";
import ViewCounter from "../_components/ViewCounter";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: DetailPageProps): Promise<Metadata> => {
  const postId = params.id;
  const post = await fetchPostDetail(postId);

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다.",
      description: "존재하지 않는 게시글입니다.",
      openGraph: {
        title: "게시글을 찾을 수 없습니다.",
        description: "존재하지 않는 게시글입니다.",
        url: `https://localhost:3000/detail/${params.id}`
      }
    };
  }

  return {
    title: `${post.title} - fit4`,
    description: `${post.content}`,
    openGraph: {
      title: `${post.title} - fit4`,
      description: `${post.content}`,
      url: `https://localhost:3000/detail/${params.id}`
    }
  };
};

export const DetailPage = async ({ params }: DetailPageProps) => {
  const postId = params.id;

  return (
    <div className="inner">
      <ViewCounter postId={postId} />

      <ContentsSection postId={postId} />
      <div className="mt-4 flex gap-4">
        <LikeSection postId={postId} />
      </div>

      <div className="mt-4">
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

export default DetailPage;
