import CommentSection from "../_components/CommentSection";
import ContentsSection from "../_components/ContentsSection";
import LikeSection from "../_components/LikeSection";
import ViewCounter from "../_components/ViewCounter";

type Props = {
  params: {
    id: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const postId = params.id;

  return (
    <div className="mx-auto max-w-3xl p-4">
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
