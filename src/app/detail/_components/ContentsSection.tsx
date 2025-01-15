"use client";

import LikeSection from "@/components/shared/LikeSection";
import { Tags } from "@/components/ui/Tags";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { formatDateTime } from "@/lib/utils/common/formatDateTime";
import { ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";

type Props = {
  postId: string;
};

const ContentsSection = ({ postId }: Props) => {
  const { post, isPending, isError } = usePostDetail(postId);

  if (isPending) return <div>스켈레톤 ui 추가해야겠지?</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const {
    title,
    users,
    created_at,
    thumbnail,
    content,
    tags = [],
    body_size = [],
    view,
    upload_place,
    comments
  } = post!;

  return (
    <>
      {/* <p className="text-3xl mb-4 font-bold">{title}</p> */}

      <article className="flex items-center justify-between">
        <div className="mb-4 flex items-center gap-4">
          <figure className="relative h-10 w-10 overflow-hidden rounded-full border-2 bg-gray-100">
            <Image
              src={users?.profile_image || ""}
              alt={`${users?.nickname || "익명"}의 프로필 이미지`}
              fill
              className="object-cover"
            />
          </figure>
          <div>
            <p className="text-lg font-medium">{users?.nickname || "익명"}</p>
            <p>{upload_place}</p>
          </div>
        </div>

        <p className="text-text-03">{formatDateTime(created_at)}</p>
      </article>

      <div className="mb-4">
        <Image src={thumbnail} alt={title || "게시글 이미지"} width={1000} height={1600} className="object-cover" />
      </div>

      <div className="relative mt-8 flex gap-4 text-title2 font-medium leading-7">
        <span className="item-center pointer-events-none absolute left-[4.5rem] flex gap-1">
          <ChatCircleDots size={28} className="text-text-03" />
          {comments}
        </span>
        <LikeSection postId={postId} styleType="detail" />
      </div>

      <p className="mt-8 p-4 text-subtitle leading-relaxed">{content}</p>

      <div className="text-sm mt-6 space-y-2 text-gray-800">
        {tags.length > 0 && (
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Tags variant="primary" size="md" label={tag} />
            ))}
          </div>
        )}
        {/* {body_size.length === 2 && (
          <p>
            <strong>키:</strong> {body_size[0]} cm, <strong>몸무게:</strong> {body_size[1]} kg
          </p>
        )}
        <p>
          <strong>조회수:</strong> {view}
        </p> */}
      </div>
    </>
  );
};

export default ContentsSection;
