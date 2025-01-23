"use client";

import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import ErrorScreen from "@/components/common/ErrorScreen";
import KakaoScript from "@/components/common/KakaoScript";
import { Tags } from "@/components/ui/Tags";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { usePostDetail } from "@/lib/hooks/detail/usePostDetail";
import { useAuthStore } from "@/lib/store/authStore";
import { relativeTimeDay } from "@/lib/utils/common/formatDateTime";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import BookmarkButton from "./ButtonBookmark";
import LikeButton from "./ButtonLike";
import ContentsSkeleton from "./ContentsSkeleton";
import EditDelete from "./EditDelete";
import ImageCarousel from "./ImageCarousel";
import ImageGallery from "./ImageGallery";
import SocialShare from "./SocialShare";
import UserProfile from "./UserProfile";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { useEffect } from "react";

type Props = {
  postId: string;
  mode?: "page" | "modal";
};

const ContentsSection = ({ postId, mode = "page" }: Props) => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const { post, isPending, isError } = usePostDetail(postId);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const { hideNavBar, showNavBar } = useNavBarStore();

  useEffect(() => {
    hideNavBar(); // 페이지에 들어오면 NavBar 숨기기
    return () => showNavBar(); // 페이지를 떠나면 NavBar 다시 표시
  }, [hideNavBar, showNavBar]);


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
      <Tablet>
        <div className="fixed left-0 top-0 z-30 w-full bg-bg-01">
          <div className="inner flex h-[60px] items-center gap-2">
            <Link href="/home">
              <CaretLeft className="" size={24} weight="bold" />
            </Link>
            <h2 className="text-title2 font-medium">게시물</h2>
          </div>
        </div>
        <div className="inner mb-[8px]">
          <UserProfile profileImage={users.profile_image} nickname={users.nickname} uploadPlace={upload_place} />
          {mode === "page" && userId === user_id && <EditDelete postId={postId} />}
        </div>
      </Tablet>
      <article className="relative flex flex-wrap justify-between">
        {mode === "modal" || isTabletOrSmaller ? (
          <ImageCarousel images={images} blur={thumbnail_blur_url} />
        ) : (
          <ImageGallery images={images} writerSpec={body_size} blur={thumbnail_blur_url} />
        )}
        <div className="tb:inner relative w-[46%]">
          <MinTablet>
            <UserProfile profileImage={users.profile_image} nickname={users.nickname} uploadPlace={upload_place} />
            {mode === "page" && userId === user_id && <EditDelete postId={postId} />}
          </MinTablet>
          {/* <Tablet>
            <PurchaseMobile postId={postId} />
          </Tablet> */}
          <p className="mt-6 max-h-[8.5rem] overflow-auto whitespace-pre-wrap text-title2 font-medium tb:text-body">
            {content}
          </p>

          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 tb:mt-[12px]">
              {tags.map((tag) => (
                <Tags key={tag} variant="gray" size="md" label={tag} />
              ))}
            </div>
          )}
          <p className="mt-4 font-medium text-text-03">
            조회수 {view} · {relativeTimeDay(created_at)}
          </p>

          <MinTablet>
            <div className="absolute bottom-0 left-0 mt-[6.35rem] flex gap-10 font-medium">
              <LikeButton postId={postId} styleType="detail" />
              <BookmarkButton postId={postId} styleType="detail" showText />
              <KakaoScript />
              <SocialShare
                postUrl={`https://fit4.vercel.app/detail/${postId}`}
                postTitle={content}
                writer={users?.nickname}
                thumbnail={images[0]}
              />
            </div>
          </MinTablet>
        </div>
      </article>
    </>
  );
};

export default ContentsSection;
