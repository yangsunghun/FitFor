import { fetchPostDetail } from "@/lib/utils/post/fetchPostDetail";
import CommentSection from "../_components/CommentSection";
import LikeSection from "../_components/LikeSection";

type Props = {
  params: {
    id: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const postId = params.id;
  const post = await fetchPostDetail(postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-3xl mb-4 font-bold">{post.title}</h1>
      <p className="mb-2 text-gray-600">작성일: {new Date(post.created_at || "").toLocaleDateString()}</p>
      <p className="mb-4">작성자 ID: {post.user_id}</p>
      <img
        src={post.thumbnail || "/placeholder.png"}
        alt={post.title}
        className="mb-4 h-64 w-full rounded-lg object-cover"
      />
      <p className="text-lg leading-relaxed">{post.content}</p>
      <div className="mt-6">
        <p>
          <strong>태그:</strong> {post.tags?.join(", ")}
        </p>
        <p>
          <strong>키:</strong> {post.body_size?.[0]} cm, <strong>몸무게:</strong> {post.body_size?.[1]} kg
        </p>
        <p>
          <strong>조회수:</strong> {post.view}
        </p>

        <div className="mt-4 flex gap-4">
          <LikeSection postId={post.id} />
        </div>
      </div>

      <div className="mt-4">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default DetailPage;
