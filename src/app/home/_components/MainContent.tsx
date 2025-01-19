"use client";

import ProfileEditTextField from "@/app/mypage/profile-setting/_components/ProfileEditTextField";
import { Button } from "@/components/ui/Button";
import { FloatingButton } from "@/components/ui/FloatingButton";
import ModalItem from "@/components/ui/Modal";
import { usePosts } from "@/lib/hooks/home/usePosts";
import { useAuthStore } from "@/lib/store/authStore";
import { useLayoutStore } from "@/lib/store/useLayoutStore";
import { updateUserProfile } from "@/lib/utils/mypage/userInfo";
import { ONBOARD_FIELD, onboardSchema } from "@/lib/validations/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import LayoutToggle from "./LayoutToggle";
import ListLayout from "./ListLayout";
import MasonryLayout from "./MasonryLayout";

const MainContent = () => {
  const { user, setUser } = useAuthStore();
  const [onboardModal, setOnboardModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: ""
    },
    resolver: zodResolver(onboardSchema)
  });
  const { isMasonry, toggleLayout } = useLayoutStore();
  const { posts, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError } = usePosts();

  const observerRef = useRef(null);

  useEffect(() => {
    // 신규 유저 체크
    if (user && !user.onboard) {
      setOnboardModal(true);
    }

    // 무한 스크롤 observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, user]);

  // 온보딩 폼 작성 완료
  const onSubmit = async (value: FieldValues): Promise<void> => {
    if (user) {
      // 서버로 수정된 정보 전달
      await updateUserProfile({
        userId: user.id,
        editForm: onboardSchema.parse(value),
        imageFileURL: user.profile_image,
        onboard: true
      });

      // zustand의 정보 업데이트
      user.nickname = value.nickname;
      user.onboard = true;
      setUser(user);
    }

    if (user?.onboard) {
      setOnboardModal(false);
    }
  };

  if (isError) return <p>오류 발생</p>;

  return (
    <>
      <section>
        <LayoutToggle isMasonry={isMasonry} onToggle={toggleLayout} />
        {isMasonry ? (
          <ListLayout isPending={isPending} posts={posts} />
        ) : (
          <MasonryLayout isPending={isPending} posts={posts} />
        )}

        {hasNextPage && <div ref={observerRef}>{isFetchingNextPage ? "불러오는 중 로딩" : "더보기"}</div>}

        {/* 온보딩 폼이 작성 완료 되었을때만 모달이 자동으로 닫힘 */}
        <ModalItem isOpen={onboardModal} onClose={() => {}}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <h3 className="text-title1 font-bold text-text-04">프로필을 만들어주세요!</h3>
              <p className="text-subtitle font-medium">다른 사람들과 소통할 나만의 프로필이에요.</p>
            </div>
            <div className="relative flex flex-col">
              {ONBOARD_FIELD.map((field) => (
                <ProfileEditTextField key={field.id} {...field} register={register} error={errors[field.id]?.message} />
              ))}
              {Object.keys(errors).length === 0 && (
                <p className="absolute -bottom-[26px] left-0 mt-1 text-body font-normal text-status-info">
                  한글 및 영문, 숫자 2~5자까지 입력할 수 있어요.
                </p>
              )}
            </div>
            <Button size="lg" className="mt-8 py-4 text-title2 leading-[1.725rem]" type="submit">
              프로필 저장하기
            </Button>
          </form>
        </ModalItem>
      </section>

      <FloatingButton variant="primary" href="/write" />
    </>
  );
};

export default MainContent;
