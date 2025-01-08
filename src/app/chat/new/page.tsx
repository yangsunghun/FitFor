"use client";

import React from "react";
import { useFunnel } from "./_hooks/useFunnel";
import { useForm } from "react-hook-form";
import { steps } from "./_utils/chatSteps";
import Introduction from "./_components/Introduction";
import Details from "./_components/Details";
import HashTags from "./_components/HashTags";
import ImageUpload from "./_components/ImageUpload";
import Completion from "./_components/Completion";
import MoveActions from "./_components/MoveActions";
import { uploadThumbnailImage } from "./_lib/uploadThumbnailImage";
import { useCreateChatRoom } from "./_hooks/useCreateChatRoom";
import { useRouter } from "next/navigation";

const CreateChatRoomPage = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps.order[0]);
  const formReturn = useForm({ mode: "onSubmit" });
  const { isPending, mutate } = useCreateChatRoom(next);
  const router = useRouter();
  const { trigger } = formReturn;

  const handleNext = async () => {
    const nextStep = steps.getNextStep(currentStep);
    if (nextStep && (await trigger())) next(nextStep);
  };

  const handlePrev = () => {
    const prevStep = steps.getPrevStep(currentStep);
    if (prevStep) prev(prevStep);
  };

  const submitFormData = async () => {
    const { title, description, hashTags, imageFile } = formReturn.getValues();
    const uploadedImage = await uploadThumbnailImage({ type: "chat-room", file: imageFile[0] });
    mutate({ title, description, hashTags, uploadedImage });
  };

  const onSubmit = () => {
    formReturn.handleSubmit(submitFormData)();
  };

  return (
    <div className="mt-16 h-lvh">
      <form className="flex flex-col items-center">
        <Funnel>
          <Step name="introduction">
            <Introduction formReturn={formReturn} />
          </Step>
          <Step name="details">
            <Details formReturn={formReturn} />
          </Step>
          <Step name="hashTags">
            <HashTags formReturn={formReturn} />
          </Step>
          <Step name="imageUpload">
            <ImageUpload formReturn={formReturn} />
          </Step>
          <Step name="completion">
            <Completion />
          </Step>
        </Funnel>
        {currentStep === "completion" ? (
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="bg-main hover:bg-main-hover mx-auto block min-w-[100px] rounded px-8 py-2 text-white transition-all"
          >
            채팅 리스트로 이동
          </button>
        ) : (
          <MoveActions
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            isPending={isPending}
            onSubmit={onSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default CreateChatRoomPage;
