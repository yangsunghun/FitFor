import { fetchPostDetail } from "@/lib/api/post/fetchPostDetail";
import ModalBg from "./ModalBg";
import ModalButton from "./ModalButton";

type Props = {
  params: {
    id: string;
  };
};

const DetailModal = async ({ params }: Props) => {
  const postId = params.id;
  const post = await fetchPostDetail(postId);

  if (!post) {
    return (
      <ModalBg>
        <div className="relative w-[400px] rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-lg font-bold">게시글을 찾을 수 없습니다.</h2>
          <ModalButton label="닫기" action="close" />
        </div>
      </ModalBg>
    );
  }

  return (
    <ModalBg>
      <div className="relative w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-xl font-bold">{post.title}</h1>
        <p className="mb-2 text-gray-600">작성일: {new Date(post.created_at || "").toLocaleDateString()}</p>
        <p className="mb-4 text-gray-500">작성자 ID: {post.user_id}</p>
        <img
          src={post.thumbnail || "/placeholder.png"}
          alt={post.title}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
        <p className="text-sm text-gray-700">{post.content.slice(0, 100)}...</p>
        <div className="mt-6">
          <p>
            <strong>태그:</strong> {post.season_tag?.join(", ")}
          </p>
          <p>
            <strong>키:</strong> {post.body_size?.[0]} cm, <strong>몸무게:</strong> {post.body_size?.[1]} kg
          </p>
          <p>
            <strong>조회수:</strong> {post.view} | <strong>좋아요:</strong> {post.likes} | <strong>북마크:</strong>{" "}
            {post.bookmarks}
          </p>

          <ModalButton label="전체 보기" action="refresh" />
          <ModalButton label="닫기" action="close" />
        </div>
      </div>
    </ModalBg>
  );
};

export default DetailModal;
