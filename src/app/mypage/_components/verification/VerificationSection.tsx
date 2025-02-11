"use client";

import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useUserStats } from "@/lib/hooks/mypage/useUserStats";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUserVerification } from "@/lib/utils/mypage/userInfo";
import { verifyUser } from "@/lib/utils/mypage/userVerification";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import StatCardsSkeleton from "./StatCardsSkeleton";

// 유저 인증 섹션
const VerificationSection = () => {
  const { user, setUser } = useAuthStore();
  const { userPostsStats, allStats, isPending, isError, userVerified } = useUserStats();
  const queryClient = useQueryClient();
  const [applicationAvailable, setApplicationAvailable] = useState(false);
  const isTabletOrSmaller = useMediaQuery("(max-width: 520px)");

  const titles = ["게시물", "좋아요", "조회수"];

  // 실시간 데이터 반영
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["postsStats"] });
    if (userPostsStats && allStats) {
      const available = verifyUser({ postNum: userPostsStats.length, likes: allStats.likes, views: allStats.view });
      setApplicationAvailable(available && !userVerified);
    }
  }, [queryClient, userPostsStats, allStats, userVerified]);

  if (isError) return <p>유저의 인증 정보를 불러오지 못했습니다.</p>;

  const handleApplication = async () => {
    if (user) {
      await updateUserVerification(user.id);
      user.is_verified = true;
      setUser(user);
    }
  };

  return (
    <>
      <div className="flex flex-col lt:px-4 tb:mb-0">
        <h3 className="mt-10 text-subtitle font-medium tb:mb-[2px] tb:mt-6 tb:text-body">내 통계 리포트</h3>
        <p className="mt-2 text-title2 text-text-03 tb:mt-0 tb:text-caption">
          세 항목 각각 500개 이상이면 인증 유저 신청 가능
        </p>
        {isPending ? (
          <StatCardsSkeleton />
        ) : (
          <div className="mt-6 grid grid-cols-3 gap-6 divide-x divide-line-02 tb:my-4 tb:gap-0 mb:max-h-20 tb:rounded-lg tb:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] tb:shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
            <StatCard title={titles[0]} value={userPostsStats!.length} className="tb:rounded-r-none" />
            <StatCard title={titles[1]} value={allStats.likes} className="tb:rounded-none" />
            <StatCard title={titles[2]} value={allStats.view} className="tb:rounded-l-none" />
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl text-center tb:mt-0">
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
        </div>
      </div>
      <div className="mt-20 rounded-2xl bg-bg-02 p-6 lt:mx-4 tb:mt-[2.125rem] tb:p-4 mb:rounded-lg">
        <h3 className="mb-6 text-subtitle font-medium text-text-04 tb:mb-3 tb:text-caption">인증 유저 요건</h3>
        <ul className="list-disc space-y-3 pl-5 text-title2 text-text-03 tb:list-none tb:space-y-1 tb:pl-0 tb:text-small">
          <li>신청 후 바로 인증 유저로 활동이 가능해요.</li>
          <li>인증 유저가 되면 Live 채팅방에 입장할 수 있어요.</li>
          <li>Live 채팅방에서 조언이 필요한 유저들의 코디를 도와줄 수 있어요.</li>
        </ul>
      </div>
    </>
  );
};

export default VerificationSection;
