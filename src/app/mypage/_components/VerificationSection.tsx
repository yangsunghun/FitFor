import { useAuthStore } from "@/lib/store/authStore";
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
      <div className="flex flex-col">
        <h3 className="mb-6 mt-10 text-subtitle">내 통계 리포트</h3>
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatsCard title="작성한 게시물 수" value={sampleStats.posts} />
          <StatsCard title="받은 좋아요 수" value={sampleStats.likes} />
          <StatsCard title="총 조회수" value={sampleStats.views} />
        </div>
        <div className="flex flex-col gap-3 rounded-2xl text-center">
          <button className="flex flex-row justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-white">
            <span className="text-subtitle font-medium">인증 유저 신청하기</span>
          </button>
          <p className="text-title2 text-text-03">스타일 멘토가 되어 조언이 필요한 유저들의 코디를 도와주세요!</p>
        </div>
      </div>
      <div className="mt-20">
        <h3 className="mb-6 text-subtitle text-text-04 font-medium">인증 유저 요건</h3>
        <ul className="text-title2 text-text-03 list-disc space-y-3 pl-5">
          <li>위 기준을 충족해야만 인증 유저로 활동할 수 있어요.</li>
          <li>인증 유저가 되면 Live 채팅방에 입장할 수 있어요.</li>
          <li>신청 후 24시간 뒤, 관리자 확인 후 인증 유저로 활동 가능해요.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
