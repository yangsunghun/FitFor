import { fetchPostDetail } from "@/lib/utils/post/fetchPostDetail";
import type { Metadata } from "next";
import CommentSection from "../_components/CommentSection";
import ContentsSection from "../_components/ContentsSection";
import PurchaseList from "../_components/PurchaseList";
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
    title: `${post.users.nickname}님의 룩북 - fit4`,
    description: `${post.content}`,
    openGraph: {
      title: `${post.users.nickname}님의 룩북 - fit4`,
      description: `${post.content}`,
      url: `https://localhost:3000/detail/${params.id}`
    }
  };
};

const DetailPage = async ({ params }: DetailPageProps) => {
  const postId = params.id;

  return (
    <div className="inner pb-40">
      <ViewCounter postId={postId} />

      <section>
        <ContentsSection postId={postId} />
      </section>
      <hr className="my-[3.75rem] border-line-02" />
      <section>
        <PurchaseList postId={postId} />
      </section>
      <hr className="my-[3.75rem] border-line-02" />
      <section>
        <CommentSection postId={postId} />
      </section>
    </div>
  );
};

export default DetailPage;
