"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useFunnel } from "../_hooks/useFunnel";
import { createChatRoom } from "../_utils/chat"; // Supabase의 함수 import
import HashTags from "./_components/HashTags";
import Summary from "./_components/Summary";
import ThumbnailImage from "./_components/ThumbnailImage";

const steps = ["Summary", "Thumbnail", "HashTags"];

export interface FormDetails {
  title: string;
  subtitle: string;
  description: string;
  thumbnail: File | null;
  hashtags: string[];
}

export default function Funnel() {
  const currentUser = useAuthStore((state) => state.user);

  const { Funnel, Step, next, prev, currentStep } = useFunnel(steps[0]);
  const [formData, setFormData] = useState<FormDetails>({
    title: "",
    subtitle: "",
    description: "",
    thumbnail: null,
    hashtags: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleNext = (data: Partial<FormDetails>, nextStep: string) => {
    setFormData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  const handleCreateChatRoom = async () => {
    if (!currentUser || !currentUser.id) {
      setError("로그인 상태를 확인해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // const userId = "98c6815b-62ce-4dc8-a36a-5078cb36f0d9"; // 실제 로그인 사용자 ID를 가져와야 함

      const { success, error } = await createChatRoom(currentUser.id, {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        hashtags: formData.hashtags,
        thumbnailUrl: formData.thumbnail ? URL.createObjectURL(formData.thumbnail) : ""
      });

      if (!success) {
        throw new Error(error);
      }

      setSuccess(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 컨텐츠 영역 */}
      <div style={{ flex: 1 }}>
        <Funnel>
          <Step name={steps[0]}>
            <Summary formData={formData} onNext={(data) => handleNext(data, steps[1])} />
          </Step>
          <Step name={steps[1]}>
            <ThumbnailImage
              formData={formData}
              onNext={(data) => handleNext(data, steps[2])}
              onPrev={() => handlePrev(steps[0])}
            />
          </Step>
          <Step name={steps[2]}>
            <HashTags
              formData={formData}
              onPrev={() => handlePrev(steps[1])}
              onCreateChatRoom={handleCreateChatRoom} // 로직 전달
              loading={loading}
              error={error}
              success={success}
            />
          </Step>
        </Funnel>
      </div>

      {/* 진행도 UI */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#000",
              transition: "width 0.3s ease"
            }}
          />
        </div>
        {/* 단계 표시 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "12px"
          }}
        >
          {steps.map((step, index) => (
            <span
              key={index}
              style={{
                color: index <= currentStepIndex ? "#000" : "#999"
              }}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import { useFunnel } from "./useFunnel";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { uploadProfileImage } from "./uploadProfileImage";
// import { createChatRoom } from "./createChatRoom";
// import TitleStep from "./_components/TitleStep";
// import ThumbnailStep from "./_components/ThumbnailStep";
// import HashTagsStep from "./_components/HashTagsStep";
// import CompletionStep from "./_components/CompletionStep";
// import MoveActions from "./_components/MoveActions";

// const steps = {
//   order: ["title", "thumbnail", "hashTags", "completion"],
//   getNextStep: (currentStep: string) => {
//     const index = steps.order.indexOf(currentStep);
//     return steps.order[index + 1] || null;
//   },
//   getPrevStep: (currentStep: string) => {
//     const index = steps.order.indexOf(currentStep);
//     return steps.order[index - 1] || null;
//   }
// };

// const CreateChatRoom = () => {
//   const { Funnel, Step, next, prev, currentStep } = useFunnel(steps.order[0]);
//   const formReturn = useForm({ mode: "onSubmit" });
//   const { trigger } = formReturn;
//   const router = useRouter();

//   const handleNext = async () => {
//     const nextStep = steps.getNextStep(currentStep);
//     if (nextStep && (await trigger())) next(nextStep);
//   };

//   const handlePrev = () => {
//     const prevStep = steps.getPrevStep(currentStep);
//     if (prevStep) prev(prevStep);
//   };

//   const submitFormData = async () => {
//     const { title, subtitle, description, hashTags, thumbnailFile } = formReturn.getValues();

//     // 프로필 이미지 업로드
//     const thumbnail_url = await uploadProfileImage({
//       type: "chat-thumbnail",
//       file: thumbnailFile[0]
//     });

//     // Supabase에 데이터 업로드
//     await createChatRoom({
//       room_title: title,
//       room_subtitle: subtitle,
//       room_description: description,
//       room_hash_tags: hashTags,
//       room_thumbnail_url: thumbnail_url,
//       isActive: true
//     });

//     router.push("/chat"); // 채팅방 리스트로 이동
//   };

//   const onSubmit = () => {
//     formReturn.handleSubmit(submitFormData)();
//   };

//   return (
//     <div className="mt-16 h-lvh">
//       <form className="flex flex-col items-center">
//         <Funnel>
//           <Step name="title">
//             <TitleStep formReturn={formReturn} />
//           </Step>
//           <Step name="thumbnail">
//             <ThumbnailStep formReturn={formReturn} />
//           </Step>
//           <Step name="hashTags">
//             <HashTagsStep formReturn={formReturn} />
//           </Step>
//           <Step name="completion">
//             <CompletionStep />
//           </Step>
//         </Funnel>
//         {currentStep === "completion" ? (
//           <button
//             type="button"
//             onClick={onSubmit}
//             className="bg-main hover:bg-main-hover mx-auto block min-w-[100px] rounded px-8 py-2 text-white transition-all"
//           >
//             채팅방 생성
//           </button>
//         ) : (
//           <MoveActions onNext={handleNext} onPrev={handlePrev} currentStep={currentStep} isPending={false} />
//         )}
//       </form>
//     </div>
//   );
// };

// export default CreateChatRoom;
