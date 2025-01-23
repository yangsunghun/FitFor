"use client";

import { Tablet } from "@/components/common/BreakPoints";
import ErrorScreen from "@/components/common/ErrorScreen";
import KakaoScript from "@/components/common/KakaoScript";
import LikeSection from "@/components/shared/LikeSection";
import { Tags } from "@/components/ui/Tags";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import ContentsSkeleton from "./ContentsSkeleton";
import EditDelete from "./EditDelete";
import ImageCarousel from "./ImageCarousel";
import ImageGallery from "./ImageGallery";
import SocialShare from "./SocialShare";
import UserProfile from "./UserProfile";

type Props = {
  postId: string;
  mode?: "page" | "modal";
};

const ContentsSection = ({ postId, mode = "page" }: Props) => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const { post, isPending, isError } = usePostDetail(postId);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  if (isPending) return <ContentsSkeleton />;
  if (isError) return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const {
    user_id,
    users,
    created_at,
    content,
    tags = [],
    body_size = [],
    view,
    images = [],
    upload_place,
    thumbnail_blur_url
  } = post!;

  return (
    <>
      <article className="flex flex-wrap justify-between">
        <Tablet>
          <div>
            <UserProfile profileImage={user?.profile_image} nickname={user?.nickname} uploadPlace={upload_place} />
            {mode === "page" && userId === user_id && <EditDelete postId={postId} />}
          </div>
        </Tablet>
        {mode === "modal" || isTabletOrSmaller ? (
          <ImageCarousel images={images} blur={thumbnail_blur_url} />
        ) : (
          <ImageGallery images={images} writerSpec={body_size} blur={thumbnail_blur_url} />
        )}
        <div className="relative w-[46%]">
          <UserProfile profileImage={user?.profile_image} nickname={user?.nickname} uploadPlace={upload_place} />

          {mode === "page" && userId === user_id && <EditDelete postId={postId} />}

          <p className="mt-6 max-h-[8.5rem] overflow-auto whitespace-pre-wrap text-title2 font-medium">{content}</p>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tags key={tag} variant="gray" size="md" label={tag} />
              ))}
            </div>
          )}
          <p className="mt-4 font-medium text-text-03">
            조회수 {view} · {relativeTimeDay(created_at)}
          </p>

          <div className="absolute bottom-0 left-0 mt-[6.35rem] flex gap-10 font-medium">
            <LikeSection postId={postId} styleType="detail" />
            <KakaoScript />
            <SocialShare
              postUrl={`https://fit4.vercel.app/detail/${postId}`}
              postTitle={content}
              writer={users?.nickname}
              thumbnail={images[0]}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default ContentsSection;
