"use client";

import { Button } from "@/components/ui/Button";
import { useUserStats } from "@/lib/hooks/mypage/useUserStats";
import { verifyUser } from "@/lib/utils/mypage/userVerification";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CardsSkeleton from "./CardsSkeleton";
import StatsCard from "./StatsCard";

// 유저 인증 섹션
const VerificationSection = () => {
  const { userPostsStats, allStats, isPending, isError, userVerified } = useUserStats();
  const queryClient = useQueryClient();
  const [applicationAvailable, setApplicationAvailable] = useState(false);

  // 실시간 데이터 반영
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["postsStats"] });
    if (userPostsStats && allStats) {
      const available = verifyUser({ postNum: userPostsStats.length, likes: allStats.likes, views: allStats.view });
      setApplicationAvailable(available && !userVerified);
    }
  }, [queryClient, userPostsStats, allStats, userVerified]);

  if (isError) return <p>유저의 인증 정보를 불러오지 못했습니다.</p>;

  // 24시간뒤 자동 인증 되는 로직
  // is_verified는 요청으로 true 보내기
  const handleApplication = () => {
    alert("서비스 준비 중입니다");
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="mt-10 text-subtitle font-medium">내 통계 리포트</h3>
        {isPending ? (
          <CardsSkeleton />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatsCard title="작성한 게시물 수" value={userPostsStats!.length} />
            <StatsCard title="받은 좋아요 수" value={allStats.likes} />
            <StatsCard title="총 조회수" value={allStats.view} />
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl text-center">
          <Button
            onClick={handleApplication}
            variant={!applicationAvailable ? "disabled" : "primary"}
            className="flex h-[3.5rem] flex-row items-center justify-center gap-2 rounded-2xl px-6 py-4"
            disabled={!applicationAvailable}
          >
            <span className="text-subtitle">{!userVerified ? "인증 유저 신청하기" : "이미 인증 되었습니다"}</span>
          </Button>
          <p className="text-title2 text-text-03">스타일 멘토가 되어 조언이 필요한 유저들의 코디를 도와주세요!</p>
        </div>
      </div>
      <div className="mt-20">
        <h3 className="mb-6 text-subtitle font-medium text-text-04">인증 유저 요건</h3>
        <ul className="list-disc pl-5 text-title2 text-text-03 space-y-3 ">
          <li>위 기준을 충족해야만 인증 유저로 활동할 수 있어요.</li>
          <li>인증 유저가 되면 Live 채팅방에 입장할 수 있어요.</li>
          <li>신청 후 24시간 뒤, 관리자 확인 후 인증 유저로 활동 가능해요.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
