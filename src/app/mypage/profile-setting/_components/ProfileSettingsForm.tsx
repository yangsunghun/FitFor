"use client";

import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUserProfile } from "@/lib/utils/mypage/userInfo";
import { createClient } from "@/lib/utils/supabase/client";
import { PROFILE_EDIT_FIELD, profileSettingSchema } from "@/lib/validations/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import GenderSelection from "./GenderSelection";
import ProfileEditTextField from "./ProfileEditTextField";
import ProfileImageUploadSection from "./ProfileImageUploadSection";

const ProfileSettingsForm = () => {
  const { user, setUser } = useAuthStore(); // 유저 정보
  const router = useRouter(); // 저장 후 마이페이지로 이동시 필요
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 storage 저장용
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기
  const [isUploading, setIsUploading] = useState(false); // 저장 중 버튼 클릭 방지
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)"); // tablet 사이즈 감지
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: user?.nickname || "",
      introduction: user?.introduction || "",
      gender: user?.gender || ""
    },
    resolver: zodResolver(profileSettingSchema)
  }); // 회원정보 수정 폼

  // 유저 정보 반영
  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        introduction: user.introduction,
        gender: user.gender || "none"
      });
      setImagePreview(user.profile_image);
    }
  }, [user, reset, setImagePreview]);

  // 제출 함수
  const onSubmit = async (value: FieldValues) => {
    if (!user) return;

    setIsUploading(true);

    let profileImageUrl = user.profile_image;
    const prevImageId = user.profile_image?.split("/").pop();

    // 파일이 존재하는 경우에만 storage에 업로드
    // 클라이언트로만 이미지 파일 업로드 가능
    if (imageFile) {
      const supabase = createClient();
      const fileName = `${user.id}_${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(`images/${fileName}`, imageFile, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      // 업로드 된 이미지의 URL 정보 받아오기
      const { data: publicUrlData } = supabase.storage.from("profile-images").getPublicUrl(`images/${fileName}`);
      profileImageUrl = publicUrlData?.publicUrl || null;

      // 기존의 이미지 제거 (존재한다면)
      if (prevImageId) {
        supabase.storage.from("profile-images").remove([`images/${prevImageId}`]);
      }
    }

    // 유저 프로필 수정 서버 액션으로 요청
    // 데이터에 변경이 있는 경우만
    if (
      value.nickname !== user.nickname ||
      value.introduction !== user.introduction ||
      value.gender !== user.gender ||
      imageFile
    ) {
      await updateUserProfile({
        userId: user.id,
        editForm: profileSettingSchema.parse(value),
        imageFileURL: profileImageUrl
      });

      // zustand에 저장
      user.profile_image = profileImageUrl;
      user.gender = value.gender;
      user.introduction = value.introduction;
      user.nickname = value.nickname;

      setUser(user);
    }
    alert("변경된 회원 정보가 저장되었습니다.");
    setIsUploading(false);
    router.push("/mypage");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex w-2/4 flex-col items-center tb:mx-4 tb:w-[21.375rem] tb:gap-6 mn:w-[95%]"
    >
      {/* 프로필 이미지 업로드 부분*/}
      <ProfileImageUploadSection
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
      />

      {/* 텍스트 입력 부분 */}
      <div className="mt-[3.875rem] flex w-[30rem] flex-col gap-10 tb:w-full">
        {PROFILE_EDIT_FIELD.map((field) => (
          <ProfileEditTextField key={field.id} {...field} register={register} error={errors[field.id]?.message} />
        ))}
      </div>

      {/* 성별 선택 */}
      <GenderSelection register={register} error={errors.gender?.message} />

      {/* 제출 */}
      <Button
        variant="primary"
        size={isTabletOrSmaller ? "sm" : "lg"}
        type="submit"
        disabled={isUploading}
        className={`mt-20 w-[30rem] tb:fixed tb:bottom-7 tb:z-50 tb:mx-4 tb:w-[95%] tb:pb-7`}
      >
        {isUploading ? "저장 중..." : "저장하기"}
      </Button>
    </form>
  );
};

export default ProfileSettingsForm;
