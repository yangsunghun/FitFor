"use client";

import ProfileEditTextField from "@/app/mypage/profile-setting/_components/ProfileEditTextField";
import { MinTablet } from "@/components/common/BreakPoints";
import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUserProfile } from "@/lib/utils/mypage/userInfo";
import { ONBOARD_FIELD, onboardSchema } from "@/lib/validations/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";

const OnboardContentWrapper = () => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const { user, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: ""
    },
    resolver: zodResolver(onboardSchema)
  });

  useEffect(() => {
    if (isTabletOrSmaller) {
      window.location.reload();
    }
  }, [isTabletOrSmaller]);

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

    // 홈으로 이동
    
  };

  return (
    <MinTablet>
      <div className="relative inline-block h-fit w-auto rounded-lg bg-bg-01 p-6 shadow-lg">
        <form className="flex w-[31.375rem] flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
                한글 및 영문, 숫자 2~10자까지 입력할 수 있어요.
              </p>
            )}
          </div>
          <Button
            disabled={!isValid}
            variant={!isValid ? "disabled" : "primary"}
            size="lg"
            className="mt-8 py-4 text-title2 leading-[1.725rem]"
            type="submit"
          >
            프로필 저장하기
          </Button>
        </form>
      </div>
    </MinTablet>
  );
};

export default OnboardContentWrapper;
