"use client";
import kakaoLogo from "@/assets/images/kakao-logo.svg";
import Dropdown from "@/components/ui/Dropdown";
import { FacebookLogo, LinkSimple, XLogo } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

type SocialShareProps = {
  postUrl: string;
  postTitle: string;
  thumbnail: string;
  writer: string;
  showText?: boolean;
  icon: ReactNode;
};

const SocialShare = ({ postUrl, postTitle, thumbnail, writer, showText, icon }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    // navigator.clipboard.writeText(postUrl).then(() => {
    //   setCopied(true);
    //   setTimeout(() => setCopied(false), 2000);
    // });
    navigator.clipboard.writeText(postUrl);
    alert("링크가 복사되었습니다!");
  };
  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}&quote=${encodeURIComponent(postTitle || "")}`;
    window.open(facebookShareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleXShare = () => {
    const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}&text=${encodeURIComponent(postTitle || "")}`;
    window.open(twitterShareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert("카카오톡 공유를 사용할 수 없습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${writer} 님의 룩북입니다. - Fit4`,
        description: postTitle,
        imageUrl: thumbnail, // 게시물 썸네일 이미지 URL
        link: {
          mobileWebUrl: postUrl,
          webUrl: postUrl
        }
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: postUrl,
            webUrl: postUrl
          }
        }
      ]
    });
  };

  return (
    <Dropdown
      trigger={
        <button className="flex flex-col gap-2 text-text-03">
          {icon}
          {showText && <span>공유</span>}
        </button>
      }
      className="flex gap-4"
    >
      <div className="flex gap-1">
        <button
          onClick={handleFacebookShare}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3b5998] text-white"
        >
          <FacebookLogo size={24} weight="fill" />
        </button>

        <button
          onClick={handleXShare}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white"
        >
          <XLogo size={24} weight="fill" />
        </button>

        <button
          onClick={handleKakaoShare}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FEE500] text-black"
        >
          <Image src={kakaoLogo} alt="" width={20} height={20} />
        </button>

        <button
          onClick={handleCopyUrl}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-600 text-white"
        >
          <LinkSimple size={24} />
        </button>
      </div>
    </Dropdown>
  );
};

export default SocialShare;
