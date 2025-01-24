"use client";

import iconExport from "@/assets/images/export.svg";
import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import ErrorScreen from "@/components/common/ErrorScreen";
import KakaoScript from "@/components/common/KakaoScript";
import SlideOver from "@/components/ui/SlideOver";
import { Tags } from "@/components/ui/Tags";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useComment } from "@/lib/hooks/detail/useComment";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { CaretLeft, ChatCircleDots, Export } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookmarkButton from "./ButtonBookmark";
import LikeButton from "./ButtonLike";
import CommentListMobile from "./CommentListMobile";
import CommentMobile from "./CommentMoblie";
import ContentsSkeleton from "./ContentsSkeleton";
import EditDelete from "./EditDelete";
import ImageCarousel from "./ImageCarousel";
import ImageGallery from "./ImageGallery";
import PurchaseMobile from "./PurchaseMobile";
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
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { comments } = useComment(postId);

  if (isPending) return <ContentsSkeleton />;
  if (isError) return <ErrorScreen error={new Error("데이터를 불러오는 중 에러가 발생했습니다.")} />;

  if (!post) {
    return <p className="text-center text-subtitle font-medium text-text-02">게시물을 찾을 수 없습니다.</p>;
  }

  const {
    id,
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
      <Tablet>
        <div className="fixed left-0 top-0 z-30 w-full bg-bg-01">
          <div className="inner flex h-[60px] items-center gap-2">
            <Link href="/home">
              <CaretLeft className="" size={24} weight="bold" />
            </Link>
            <h2 className="text-title2 font-medium">게시물</h2>
          </div>
        </div>
        <div className="inner relative mb-[8px]">
          <UserProfile profileImage={users.profile_image} nickname={users.nickname} uploadPlace={upload_place} />
          {mode === "page" && userId === user_id && <EditDelete postId={postId} />}
        </div>
      </Tablet>
      <article className="relative flex flex-wrap justify-between">
        {mode === "modal" || isTabletOrSmaller ? (
          <ImageCarousel images={images} writerSpec={body_size} blur={thumbnail_blur_url} />
        ) : (
          <ImageGallery images={images} writerSpec={body_size} blur={thumbnail_blur_url} />
        )}
        <Tablet>
          <PurchaseMobile postId={postId} />
        </Tablet>
        <div className="tb:inner relative w-[46%]">
          <MinTablet>
            <UserProfile profileImage={users.profile_image} nickname={users.nickname} uploadPlace={upload_place} />
            {mode === "page" && userId === user_id && <EditDelete postId={postId} />}
          </MinTablet>

          <p className="mt-6 max-h-[8.5rem] overflow-auto whitespace-pre-wrap text-title2 font-medium tb:mt-[8px] tb:text-body">
            {content}
          </p>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 tb:mt-[12px]">
              {tags.map((tag) => (
                <Tags key={tag} variant="gray" size="md" label={tag} />
              ))}
            </div>
          )}

          <Tablet>
            <CommentListMobile postId={postId} />
          </Tablet>

          <p className="mt-4 font-medium text-text-03 tb:mt-0 tb:text-caption mb:text-small">
            조회수 {view} · {relativeTimeDay(created_at)}
          </p>

          <MinTablet>
            <div className="absolute bottom-0 left-0 mt-[6.35rem] flex gap-10 font-medium">
              <LikeButton postId={postId} styleType="detail" iconSize={28} showNumber />
              <BookmarkButton postId={postId} styleType="detail" iconSize={28} showText />
              <KakaoScript />
              <SocialShare
                postUrl={`https://fit4.vercel.app/detail/${postId}`}
                postTitle={content}
                writer={users?.nickname}
                thumbnail={images[0]}
                icon={<Export size={28} />}
                showText
              />
            </div>
          </MinTablet>
          <Tablet>
            <aside className="shadow-normal fixed bottom-[20px] left-1/2 z-40 -ml-[155px] flex h-[52px] min-w-[310px] items-center rounded-full bg-bg-01 px-[16px] text-caption font-medium">
              <span className="flex flex-1 justify-center">
                <LikeButton postId={postId} styleType="detailMob" iconSize={24} iconWeight="fill" showNumber />
              </span>
              <button
                className="flex flex-1 items-center justify-center gap-1 text-text-02"
                onClick={() => {
                  setIsCommentOpen(true);
                }}
              >
                <ChatCircleDots size={24} weight="fill" />
                <span className="text-text-03">{comments.length}</span>
              </button>
              <span className="flex flex-1 justify-center">
                <BookmarkButton postId={postId} styleType="detailMob" iconSize={24} iconWeight="fill" />
              </span>
              <span className="flex flex-1 justify-center">
                <KakaoScript />
                <SocialShare
                  postUrl={`https://fit4.vercel.app/detail/${postId}`}
                  postTitle={content}
                  writer={users?.nickname}
                  thumbnail={images[0]}
                  icon={<Image src={iconExport} alt="" width={24} height={24} />}
                />
              </span>
            </aside>

            {isCommentOpen && (
              <SlideOver title={`댓글 ${comments.length}`} onClose={() => setIsCommentOpen(false)}>
                <CommentMobile postId={id} />
              </SlideOver>
            )}
          </Tablet>
        </div>
      </article>
    </>
  );
};

export default ContentsSection;
