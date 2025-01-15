import { useAuthStore } from "@/lib/store/authStore";
import { Plus } from "@phosphor-icons/react";
import StatsCard from "./StatsCard";

type VerificationSectionProps = {
  isVerified: boolean;
};

const sampleStats = {
  posts: 42,
  likes: 128,
  views: 1337
};

const VerificationSection = ({ isVerified = false }: VerificationSectionProps) => {
  const { user } = useAuthStore();
  return (
    <>
      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatsCard title="작성한 게시물 수" value={sampleStats.posts} />
        <StatsCard title="받은 좋아요 수" value={sampleStats.likes} />
        <StatsCard title="총 조회수" value={sampleStats.views} />
      </div>
      <div className="mb-8 rounded-lg bg-gray-100 p-8">
        <p className="mb-4 text-center">{user?.nickname}님, 인증배지를 신청할 수 있어요!</p>
        <div className="flex justify-center">
          <button className="flex flex-row gap-2 rounded-2xl bg-black p-4 text-white">
            <Plus size={24} /> 인증배지 신청하기
          </button>
        </div>
      </div>
      <div className="mb-8 rounded-lg bg-gray-100 p-8">
        <h3 className="mb-4 font-medium">인증배지 발급 종족 요건</h3>
        <ul className="list-disc space-y-4 pl-5">
          <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
          <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
          <li>Lorem ipsum dolor sit amet consectetur. Proin purus amet nec tristique nulla congue.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
