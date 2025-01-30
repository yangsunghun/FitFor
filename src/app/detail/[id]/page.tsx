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
      title: "fit4",
      description: "삭제된 게시글",
      openGraph: {
        title: "fit4",
        description: "삭제된 게시글",
        url: `https://fit4.vercel.app/detail/${params.id}`
      }
    };
  }
  const maxDescriptionLength = 160;

  return {
    title: `Fit4 - ${post.users.nickname}님의 룩북`,
    description:
      post.content.length > maxDescriptionLength ? `${post.content.slice(0, maxDescriptionLength)}...` : post.content,
    openGraph: {
      title: `Fit4 - ${post.users.nickname}님의 룩북`,
      description:
        post.content.length > maxDescriptionLength ? `${post.content.slice(0, maxDescriptionLength)}...` : post.content,
      url: `https://fit4.vercel.app/detail/${params.id}`
    }
  };
};

const DetailPage = async ({ params }: DetailPageProps) => {
  const postId = params.id;

  return (
    <div className="md:inner pb-40 pt-10 tb:pb-20 tb:pt-[70px]">
      <ViewCounter postId={postId} />

      <section>
        <ContentsSection postId={postId} />
      </section>
      <hr className="my-[3.75rem] border-line-02 tb:hidden" />
      <section className="tb:hidden">
        <PurchaseList postId={postId} />
      </section>
      <hr className="my-[3.75rem] border-line-02 tb:hidden" />
      <section id="comment" className="tb:hidden">
        <CommentSection postId={postId} />
      </section>
    </div>
  );
};

export default DetailPage;
