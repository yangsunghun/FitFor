import ContentsSection from "@/app/detail/_components/ContentsSection";
import ViewCounter from "@/app/detail/_components/ViewCounter";
import { fetchPostDetail } from "@/lib/utils/post/fetchPostDetail";
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
        <ViewCounter postId={postId} />

        <ContentsSection postId={postId} />

        <ModalButton label="전체 보기" action="refresh" />
        <ModalButton label="닫기" action="close" />
      </div>
    </ModalBg>
  );
};

export default DetailModal;
