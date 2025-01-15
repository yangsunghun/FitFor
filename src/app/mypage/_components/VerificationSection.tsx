"use client";

import { Button } from "@/components/ui/Button";
import { useUserStats } from "@/lib/hooks/mypage/useUserStats";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import StatsCard from "./StatsCard";

// 추후에 로직이 필요
type VerificationSectionProps = {
  isVerified: boolean;
};

const VerificationSection = ({ isVerified = false }: VerificationSectionProps) => {
  const { userPostsStats, allStats, isPending, isFetching, isError } = useUserStats();
  const queryClient = useQueryClient();

  // 실시간 데이터 반영
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["postsStats"] });
  }, []);

  if (isError) return <p>유저의 인증 정보를 불러오지 못했습니다.</p>;

  const handleApplication = () => {
    alert("서비스 준비 중입니다");
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="mb-6 mt-10 text-subtitle">내 통계 리포트</h3>
        {isPending || isFetching ? (
          <p>로딩 중...</p>
        ) : (
          <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatsCard title="작성한 게시물 수" value={userPostsStats!.length} />
            <StatsCard title="받은 좋아요 수" value={allStats.likes} />
            <StatsCard title="총 조회수" value={allStats.view} />
          </div>
        )}
        <div className="flex flex-col gap-3 rounded-2xl text-center">
          {/* 비활성화 디자인 논의 */}
          <Button
            onClick={handleApplication}
            variant="disabled"
            className="flex flex-row h-[3.5rem] items-center justify-center gap-2 rounded-2xl px-6 py-4"
            disabled={true}
          >
            <span className="text-subtitle">인증 유저 신청하기</span>
          </Button>
          <p className="text-title2 text-text-03">스타일 멘토가 되어 조언이 필요한 유저들의 코디를 도와주세요!</p>
        </div>
      </div>
      <div className="mt-20">
        <h3 className="mb-6 text-subtitle font-medium text-text-04">인증 유저 요건</h3>
        <ul className="list-disc space-y-3 pl-5 text-title2 text-text-03">
          <li>위 기준을 충족해야만 인증 유저로 활동할 수 있어요.</li>
          <li>인증 유저가 되면 Live 채팅방에 입장할 수 있어요.</li>
          <li>신청 후 24시간 뒤, 관리자 확인 후 인증 유저로 활동 가능해요.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
