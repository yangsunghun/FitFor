"use client";

import React from "react";
import { useFunnel } from "./useFunnel";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { uploadProfileImage } from "./uploadProfileImage";
import { createChatRoom } from "./createChatRoom";
import TitleStep from "./_components/TitleStep";
import ThumbnailStep from "./_components/ThumbnailStep";
import HashTagsStep from "./_components/HashTagsStep";
import CompletionStep from "./_components/CompletionStep";
import MoveActions from "./_components/MoveActions";

const steps = {
  order: ["title", "thumbnail", "hashTags", "completion"],
  getNextStep: (currentStep: string) => {
    const index = steps.order.indexOf(currentStep);
    return steps.order[index + 1] || null;
  },
  getPrevStep: (currentStep: string) => {
    const index = steps.order.indexOf(currentStep);
    return steps.order[index - 1] || null;
  }
};

const CreateChatRoom = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps.order[0]);
  const formReturn = useForm({ mode: "onSubmit" });
  const { trigger } = formReturn;
  const router = useRouter();

  const handleNext = async () => {
    const nextStep = steps.getNextStep(currentStep);
    if (nextStep && (await trigger())) next(nextStep);
  };

  const handlePrev = () => {
    const prevStep = steps.getPrevStep(currentStep);
    if (prevStep) prev(prevStep);
  };

  const submitFormData = async () => {
    const { title, subtitle, description, hashTags, thumbnailFile } = formReturn.getValues();

    // 프로필 이미지 업로드
    const thumbnail_url = await uploadProfileImage({
      type: "chat-thumbnail",
      file: thumbnailFile[0]
    });

    // Supabase에 데이터 업로드
    await createChatRoom({
      room_title: title,
      room_subtitle: subtitle,
      room_description: description,
      room_hash_tags: hashTags,
      room_thumbnail_url: thumbnail_url,
      isActive: true
    });

    router.push("/chat"); // 채팅방 리스트로 이동
  };

  const onSubmit = () => {
    formReturn.handleSubmit(submitFormData)();
  };

  return (
    <div className="mt-16 h-lvh">
      <form className="flex flex-col items-center">
        <Funnel>
          <Step name="title">
            <TitleStep formReturn={formReturn} />
          </Step>
          <Step name="thumbnail">
            <ThumbnailStep formReturn={formReturn} />
          </Step>
          <Step name="hashTags">
            <HashTagsStep formReturn={formReturn} />
          </Step>
          <Step name="completion">
            <CompletionStep />
          </Step>
        </Funnel>
        {currentStep === "completion" ? (
          <button
            type="button"
            onClick={onSubmit}
            className="bg-main hover:bg-main-hover mx-auto block min-w-[100px] rounded px-8 py-2 text-white transition-all"
          >
            채팅방 생성
          </button>
        ) : (
          <MoveActions onNext={handleNext} onPrev={handlePrev} currentStep={currentStep} isPending={false} />
        )}
      </form>
    </div>
  );
};

export default CreateChatRoom;
