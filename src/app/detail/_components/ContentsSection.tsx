"use client";

import LikeSection from "@/components/shared/LikeSection";
import { Tags } from "@/components/ui/Tags";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { formatDateTime } from "@/lib/utils/common/formatDateTime";
import { ChatCircleDots } from "@phosphor-icons/react";
import Image from "next/image";
import ImageGallery from "./ImageGallery";

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
    images = [],
    upload_place,
    comments
  } = post!;

  const allImages = [thumbnail, ...images];

  return (
    <>
      {/* <p className="text-3xl mb-4 font-bold">{title}</p> */}

      <article className="flex items-start justify-between">
        <ImageGallery images={allImages} />

        <div className="w-[48%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <figure className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-100">
                <Image
                  src={users?.profile_image || ""}
                  alt={`${users?.nickname || "익명"}의 프로필 이미지`}
                  fill
                  className="object-cover"
                />
              </figure>
              <div>
                <p className="text-title2 font-bold">{users?.nickname || "익명"}</p>
                <p className="text-text-03">{upload_place}</p>
              </div>
            </div>

            <p className="text-text-03">{formatDateTime(created_at)}</p>
          </div>

          <p className="mt-10 text-title2">{content}</p>
        </div>
      </article>

      <div className="relative mt-8 flex gap-4 text-title2 font-medium leading-7">
        <span className="item-center pointer-events-none absolute left-[4.5rem] flex gap-1">
          <ChatCircleDots size={28} className="text-text-03" />
          {comments}
        </span>
        <LikeSection postId={postId} styleType="detail" />
      </div>

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
