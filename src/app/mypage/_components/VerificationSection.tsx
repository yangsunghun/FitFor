"use client";

import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useUserStats } from "@/lib/hooks/mypage/useUserStats";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUserVerification } from "@/lib/utils/mypage/userInfo";
import { verifyUser } from "@/lib/utils/mypage/userVerification";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CardsSkeleton from "./CardsSkeleton";
import StatsCard from "./StatsCard";

// 유저 인증 섹션
const VerificationSection = () => {
  const { user, setUser } = useAuthStore();
  const { userPostsStats, allStats, isPending, isError, userVerified } = useUserStats();
  const queryClient = useQueryClient();
  const [applicationAvailable, setApplicationAvailable] = useState(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 540px)");

  const titles = isTabletOrSmaller
    ? ["게시물", "좋아요", "조회수"]
    : ["작성한 게시물 수", "받은 좋아요 수", "총 조회수"];

  // 실시간 데이터 반영
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["postsStats"] });
    if (userPostsStats && allStats) {
      const available = verifyUser({ postNum: userPostsStats.length, likes: allStats.likes, views: allStats.view });
      setApplicationAvailable(available && !userVerified);
    }
  }, [queryClient, userPostsStats, allStats, userVerified]);

  if (isError) return <p>유저의 인증 정보를 불러오지 못했습니다.</p>;

  // 24시간뒤 자동 인증 되는 로직?
  // is_verified는 요청으로 true 보내기
  const handleApplication = async () => {
    if (user) {
      await updateUserVerification(user.id);
      user.is_verified = true;
      setUser(user);
    }
  };

  return (
    <>
      <div className="flex flex-col lt:p-4 tb:mb-0">
        <h3 className="mt-10 text-subtitle font-medium tb:text-body">내 통계 리포트</h3>
        <p className="hidden text-caption text-text-03 tb:inline">세 항목 각각 500개 이상이면 인증 유저 신청 가능</p>
        {isPending ? (
          <CardsSkeleton />
        ) : (
          <div className="mt-6 grid grid-cols-1 grid-cols-3 gap-6 divide-x divide-line-02 mb:max-h-20 mb:gap-0 mb:rounded-lg mb:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] mb:shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] tb:gap-4">
            <StatsCard title={titles[0]} value={userPostsStats!.length} className="mb:rounded-r-none mb:shadow-none" />
            <StatsCard title={titles[1]} value={allStats.likes} className="mb:rounded-none mb:shadow-none" />
            <StatsCard title={titles[2]} value={allStats.view} className="mb:rounded-l-none mb:shadow-none" />
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl text-center mb:mt-2">
          <Button
            onClick={handleApplication}
            variant={!applicationAvailable ? "disabled" : "primary"}
            size={isTabletOrSmaller ? "sm" : "md"}
            className="flex h-[3.5rem] flex-row items-center justify-center gap-2 rounded-2xl px-6 py-4 font-medium tb:h-11 tb:rounded-lg"
            disabled={!applicationAvailable}
          >
            <span className="text-subtitle tb:text-body">
              {!userVerified ? "인증 유저 신청하기" : "이미 인증 되었습니다"}
            </span>
          </Button>
          <p className="text-title2 text-text-03 mb:hidden tb:text-body">
            스타일 멘토가 되어 조언이 필요한 유저들의 코디를 도와주세요!
          </p>
        </div>
      </div>
      <div className="mt-20 tb:bg-bg-02 tb:rounded-2xl mb:rounded-lg tb:mt-9 lt:m-4 lt:p-4">
        <h3 className="mb-6 text-subtitle font-medium text-text-04 tb:text-caption tb:mb-3">인증 유저 요건</h3>
        <ul className="list-disc space-y-3 pl-5 text-title2 text-text-03 tb:text-small tb:list-none tb:pl-0 tb:space-y-1">
          <li>위 기준을 충족해야만 인증 유저로 활동할 수 있어요.</li>
          <li>인증 유저가 되면 Live 채팅방에 입장할 수 있어요.</li>
          <li>신청 후 24시간 뒤, 관리자 확인 후 인증 유저로 활동 가능해요.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
