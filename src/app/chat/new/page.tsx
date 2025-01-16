"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Summary from "./_components/Summary";
import ThumbnailImage from "./_components/ThumbnailImage";
import Tags from "./_components/TagInput";
import { useFunnel } from "../_hooks/useFunnel";
import ProgressBar from "./_components/ProgressBar";
import { createRoomHandler } from "../_utils/createRoomHandler";
import { useAuthStore } from "@/lib/store/authStore";

const steps = ["Summary", "Thumbnail", "HashTags"];

export interface FormDetails {
  title: string;
  subtitle: string;
  description: string;
  thumbnail: File;
  hashtags: string[];
  category: string;
}

const Funnel = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps[0]);
  const methods = useForm<FormDetails>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      thumbnail: undefined,
      hashtags: [],
      category: ""
    }
  });

  const currentStepIndex = steps.indexOf(currentStep);

  const handleNextStep = methods.handleSubmit(() => {
    next(steps[currentStepIndex + 1]); // 다음 단계로 이동
  });

  const handlePrevStep = () => {
    prev(steps[currentStepIndex - 1]); // 이전 단계로 이동
  };

  const handleFormSubmit = methods.handleSubmit(async (data) => {
    // 로그인 여부 확인
    if (!currentUser || !currentUser.id) {
      alert("로그인 상태를 확인해주세요.");
      return;
    }

    // 썸네일 파일 확인
    if (!data.thumbnail) {
      alert("썸네일 파일을 선택해주세요.");
      return;
    }

    try {
      // 채팅방 생성 요청
      const { success, error } = await createRoomHandler(currentUser.id, data);

      if (!success) {
        throw new Error(error);
      }

      // 성공 처리
      alert("채팅방이 성공적으로 생성되었습니다!");
    } catch (error) {
      // 에러 처리
      console.error("채팅방 생성 실패:", error);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="flex h-screen flex-col">
        <div className="flex-1 p-4">
          <Funnel>
            <Step name={steps[0]}>
              <Summary />
            </Step>
            <Step name={steps[1]}>
              <ThumbnailImage />
            </Step>
            <Step name={steps[2]}>
              <Tags />
            </Step>
          </Funnel>
        </div>

        <ProgressBar currentStepIndex={currentStepIndex} steps={steps} />

        <div className="flex justify-between p-4">
          <button
            onClick={handlePrevStep}
            className="rounded-lg bg-gray-200 px-6 py-2 text-black"
            disabled={currentStepIndex === 0}
          >
            이전
          </button>
          <button
            onClick={currentStepIndex === steps.length - 1 ? handleFormSubmit : handleNextStep}
            className="rounded-lg bg-black px-6 py-2 text-white"
          >
            {currentStepIndex === steps.length - 1 ? "완료" : "다음"}
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Funnel;
