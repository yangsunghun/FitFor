"use client";

import sampleImage from "@/assets/images/image_sample.png";
import LikeSection from "@/components/shared/LikeSection";
import { Tags } from "@/components/ui/Tags";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { Export } from "@phosphor-icons/react";
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

  const { users, created_at, content, tags = [], body_size = [], view, images = [], upload_place } = post!;

  return (
    <>
      {/* <p className="text-3xl mb-4 font-bold">{title}</p> */}

      <article className="flex justify-between">
        <ImageGallery images={images} writerSpec={body_size} />

        <div className="relative w-[46%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <figure className="relative h-12 w-12 overflow-hidden rounded-full border bg-gray-100">
                <Image
                  src={users?.profile_image || sampleImage}
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

            <p className="text-text-03">{relativeTimeDay(created_at)}</p>
          </div>

          <p className="mt-6 h-[8.5rem] overflow-auto text-title2 font-medium">{content}</p>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tags key={tag} variant="black" size="md" label={tag} />
              ))}
            </div>
          )}
          <p className="mt-4 font-medium text-text-03">조회수 {view}</p>

          <div className="absolute bottom-[6.75rem] left-0 mt-[6.35rem] flex gap-10 font-medium">
            <LikeSection postId={postId} styleType="detail" />
            <button className="flex flex-col gap-2">
              <Export size={28} />
              <span>공유</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ContentsSection;
