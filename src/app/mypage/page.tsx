import type { Metadata } from "next";
import MypageMenu from "./_components/MypageMenu";
import ProfileSection from "./_components/ProfileSection";

export const metadata: Metadata = {
  title: "FitFor - 마이페이지",
  description: "내 프로필 정보와 작성한 룩북을 확인하세요.",
  openGraph: {
    title: "FitFor - 마이페이지",
    description: "내 프로필 정보와 작성한 룩북을 확인하세요.",
    url: "https://fit4.vercel.app/mypage"
  }
};

const PrivatePage = () => {
  return (
    <div className="mx-auto h-screen max-w-[62.25rem] justify-items-center">
      <ProfileSection />
      <MypageMenu />
    </div>
  );
};

export default PrivatePage;
