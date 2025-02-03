"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface PostHeaderProps {
  mode?: "post" | "edit";
}

const PostHeader = ({ mode = "post" }: PostHeaderProps) => {
  const router = useRouter();

  // 제목 및 설명을 조건부로 설정
  const headerTitle = mode === "edit" ? "게시물 수정하기" : "게시물 작성하기";
  const headerDescription = mode === "edit" ? undefined : "나만의 룩이나 소개하고 싶은 옷을 공유해보세요!";

  return (
    <header className="flex flex-col space-y-2 pb-10 tb:gap-4 tb:px-8 tb:pb-10 mb:gap-4 mb:px-4 mb:pb-5">
      {/* 뒤로가기 버튼 */}
      <div className="flex items-center tb:h-10">
        <button className="hidden items-center justify-center tb:inline-flex" onClick={() => router.back()}>
          <CaretLeft size={24} className="text-text-04" />
        </button>
      </div>

      {/* 제목 및 설명 */}
      <div className="tb:space-y-1">
        <p className="text-title1 font-bold leading-[150%] text-text-04 mb:text-title2">{headerTitle}</p>
        {headerDescription && <p className="text-title2 text-text-03 mb:text-body">{headerDescription}</p>}
      </div>
    </header>
  );
};

export default PostHeader;
