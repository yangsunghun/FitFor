"use client";

import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import Image from "next/image";

type Props = {
  postId: string;
};

const ContentsSection = ({ postId }: Props) => {
  const { post, isPending, error } = usePostDetail(postId);

  if (isPending) return <div>스켈레톤 ui 추가해야겠지?</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const { title, users, created_at, thumbnail, content, tags = [], body_size = [], view } = post!;

  return (
    <div className="contents-section">
      <p className="text-3xl mb-4 font-bold">{title}</p>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 bg-gray-100">
          <Image
            src={users?.profile_image || "/placeholder-profile.png"}
            alt={`${users?.nickname || "익명"}의 프로필 이미지`}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-lg font-medium">{users?.nickname || "익명"}</p>
      </div>

      <p className="text-sm mb-2 text-gray-600">
        작성일: {created_at ? new Date(created_at).toLocaleDateString() : "알 수 없음"}
      </p>

      <div className="mb-4">
        <Image
          src={thumbnail || "/placeholder.png"}
          alt={title || "게시글 이미지"}
          width={800}
          height={400}
          className="h-64 w-full rounded-lg object-cover"
        />
      </div>

      <p className="text-lg mb-6 leading-relaxed">{content}</p>

      <div className="text-sm mt-6 space-y-2 text-gray-800">
        {tags.length > 0 && (
          <p>
            <strong>태그:</strong> {tags.join(", ")}
          </p>
        )}
        {body_size.length === 2 && (
          <p>
            <strong>키:</strong> {body_size[0]} cm, <strong>몸무게:</strong> {body_size[1]} kg
          </p>
        )}
        <p>
          <strong>조회수:</strong> {view}
        </p>
      </div>
    </div>
  );
};

export default ContentsSection;
