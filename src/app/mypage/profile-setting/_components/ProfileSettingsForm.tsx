"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { updateUserProfile } from "@/lib/utils/mypage/userInfo";
import { createClient } from "@/lib/utils/supabase/client";
import { profileSettingSchema } from "@/lib/validataions/profileSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import { useForm, type FieldValues } from "react-hook-form";

const ProfileSettingsForm = () => {
  const { user } = useAuthStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      nickname: user?.nickname || "",
      introduction: user?.introduction || "",
      gender: user?.gender || "none"
    },
    resolver: zodResolver(profileSettingSchema)
  });

  // 초기 유저 데이터 불러오기
  useEffect(() => {
    if (user) {
      setImagePreview(user.profile_image);
      reset({
        nickname: user.nickname || "",
        introduction: user.introduction || "",
        gender: user.gender || "none"
      });
    }
  }, [user?.profile_image, user, reset]);

  // 제출 함수
  const onSubmit = async (value: FieldValues) => {
    if (!user) return;

    setIsUploading(true);

    let profileImageUrl = user.profile_image;

    // 파일이 존재하는 경우에만 storage에 업로드
    if (imageFile) {
      const supabase = createClient();
      const fileName = `${user.id}_${Date.now()}`; // Unique file name
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile-images") // Your bucket name
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
    }

    // 유저 프로필 수정 서버 액션으로 요청
    const result = await updateUserProfile({
      userId: user.id,
      editForm: profileSettingSchema.parse(value),
      imageFileURL: profileImageUrl
    });

    console.log("완료 후: ", result);
  };

  // 이미지 업로드 (파일 선택)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 이미지 드롭 다운
  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-2/4 flex-col items-center space-y-6">
      {/* 프로필 이미지 업로드 부분*/}
      <div
        className="group relative mb-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
      >
        {/* 이미지 preview */}
        {imagePreview ? (
          <Image src={imagePreview} alt="Preview" fill className="h-full w-full rounded-full object-cover" />
        ) : (
          <Plus size={48} />
        )}

        {/* 호버 마스크 */}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/50 group-hover:flex">
          <Plus size={48} className="text-white" />
        </div>

        {/* 파일 선택 부분 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />
      </div>

      {/* 닉네임 */}
      <div className="w-full max-w-md">
        <label htmlFor="nickname" className="text-sm block font-medium text-gray-700">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="Placeholder"
          {...register("nickname")}
          className={`mt-1 w-full rounded-md border px-4 py-2 shadow-sm focus:border-black focus:ring-black ${
            errors.nickname ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nickname && <p className="text-sm mt-1 text-red-500">{errors.nickname.message}</p>}
      </div>

      {/* 한 줄 소개 */}
      <div className="w-full max-w-md">
        <label htmlFor="oneLineIntro" className="text-sm block font-medium text-gray-700">
          한 줄 소개
        </label>
        <input
          id="oneLineIntro"
          type="text"
          placeholder="Placeholder"
          {...register("introduction")}
          className={`mt-1 w-full rounded-md border px-4 py-2 shadow-sm focus:border-black focus:ring-black ${
            errors.introduction ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.introduction && <p className="text-sm mt-1 text-red-500">{errors.introduction.message}</p>}
      </div>

      {/* 성별 선택 */}
      <div className="w-full max-w-md">
        <label className="text-sm mb-2 block font-medium text-gray-700">성별</label>
        <div className="flex justify-between">
          {["male", "female", "none"].map((gender) => (
            <label key={gender} className="flex items-center space-x-2">
              <input
                type="radio"
                value={gender}
                {...register("gender")}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black accent-white peer-checked:bg-black peer-checked:text-white"
              />
              <span>{gender === "male" ? "남성" : gender === "female" ? "여성" : "선택하지 않음"}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-sm mt-1 text-red-500">{errors.gender.message}</p>}
      </div>

      {/* 제출 */}
      <button
        type="submit"
        className="mt-8 w-full max-w-md rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
      >
        수정 완료
      </button>
    </form>
  );
};

export default ProfileSettingsForm;
