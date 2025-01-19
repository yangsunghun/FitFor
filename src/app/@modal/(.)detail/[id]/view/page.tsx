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
        <div className="inner relative max-w-[996px] rounded-lg bg-bg-01 p-8 shadow-lg">
          <p className="text-titke font-bold">게시글을 찾을 수 없습니다.</p>
          <ModalButton label="닫기" action="close" />
        </div>
      </ModalBg>
    );
  }

  return (
    <ModalBg>
      <div className="inner relative max-w-[1080px] rounded-2xl bg-bg-01 p-10 shadow-lg">
        <ViewCounter postId={postId} />
        <ContentsSection postId={postId} mode="modal" />
        <div className="absolute bottom-10 right-10">
          <ModalButton label="전체 보기" action="refresh" />
        </div>
      </div>
    </ModalBg>
  );
};

export default DetailModal;
