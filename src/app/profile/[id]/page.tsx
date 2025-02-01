import { fetchOtherUserProfile } from "@/lib/utils/mypage/userInfo";
import type { Metadata } from "next";
import ProfileSection from "../_components/ProfileSection";
import UserInfoTab from "../_components/UserInfoTab";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: DetailPageProps): Promise<Metadata> => {
  const otherUserId = params.id;
  const otherUser = await fetchOtherUserProfile(otherUserId);

  if (!otherUser) {
    return {
      title: "Fit4",
      description: "삭제된 게시글",
      openGraph: {
        title: "Fit4",
        description: "삭제된 게시글",
        url: `https://fit4.vercel.app/profile/${params.id}`
      }
    };
  }
  const maxDescriptionLength = 160;

  return {
    title: `Fit4 - ${otherUser.nickname}님의 룩북`,
    description:
      otherUser.introduction.length > maxDescriptionLength
        ? `${otherUser.introduction.slice(0, maxDescriptionLength)}...`
        : otherUser.introduction,
    openGraph: {
      title: `Fit4 - ${otherUser.nickname}님의 룩북`,
      description:
        otherUser.introduction.length > maxDescriptionLength
          ? `${otherUser.introduction.slice(0, maxDescriptionLength)}...`
          : otherUser.introduction,
      url: `https://fit4.vercel.app/profile/${params.id}`
    }
  };
};

const ProfilePage = ({ params }: DetailPageProps) => {
  const otherUserId = params.id;
  return (
    <div className="mx-auto h-screen max-w-[62.25rem] justify-items-center">
      <ProfileSection userId={otherUserId} />
      <UserInfoTab userId={otherUserId} />
    </div>
  );
};

export default ProfilePage;
