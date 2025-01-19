import React from "react";
import { z } from "zod";
import type { chatRoomSchema } from "@/lib/validations/chatRoomSchema";
import ChatRoomForm from "./_components/ChatRoomForm";

export type ChatRoomFormInputs = z.infer<typeof chatRoomSchema>;

const CreateRoomPage = () => {
  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-10">
      <div className="space-y-2 pb-10">
        <h1 className="text-title1 font-bold leading-[150%] text-text-04">Live 만들기</h1>
        <p className="text-title2 font-medium text-text-04">조언이 필요한 코디를 스타일 멘토와 공유해보세요!</p>
      </div>
      <div>
        <ChatRoomForm />
      </div>
    </div>
  );
};

export default CreateRoomPage;

// 'use client'

// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// const ChatRoomCreationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors }
//   } = useForm();
//   const [thumbnail, setThumbnail] = useState(null);
//   const topics = ["성별", "계절", "스타일", "TPO"];

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnail(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg rounded-lg border p-4 shadow-lg">
//       {/* Live 이름 입력 */}
//       <div className="mb-4">
//         <label htmlFor="liveName" className="text-sm block font-medium text-gray-700">
//           Live 이름 <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="liveName"
//           placeholder="예시 - 소개팅 가야하는데 도와주세요"
//           className={`mt-1 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-black ${
//             errors.liveName ? "border-red-500" : ""
//           }`}
//           {...register("liveName", { required: "Live 이름을 입력해주세요." })}
//         />
//         {errors.liveName && <p className="text-sm mt-1 text-red-500">{errors.liveName.message}</p>}
//       </div>

//       {/* 주제 선택 */}
//       <div className="mb-4">
//         <label className="text-sm block font-medium text-gray-700">
//           Live 주제를 선택해주세요. <span className="text-red-500">*</span>
//         </label>
//         <Controller
//           name="topics"
//           control={control}
//           defaultValue={[]}
//           rules={{
//             validate: (value) => value.length > 0 || "최소 하나의 주제를 선택해주세요."
//           }}
//           render={({ field: { onChange, value } }) => (
//             <div className="mt-2 flex flex-wrap gap-2">
//               {topics.map((topic) => (
//                 <button
//                   type="button"
//                   key={topic}
//                   onClick={() => onChange(value.includes(topic) ? value.filter((t) => t !== topic) : [...value, topic])}
//                   className={`rounded-full border px-4 py-2 ${
//                     value.includes(topic) ? "bg-black text-white" : "bg-white text-black"
//                   } hover:bg-black hover:text-white`}
//                 >
//                   {topic}
//                 </button>
//               ))}
//             </div>
//           )}
//         />
//         {errors.topics && <p className="text-sm mt-1 text-red-500">{errors.topics.message}</p>}
//       </div>

//       {/* 썸네일 업로드 */}
//       <div className="mb-4">
//         <label className="text-sm block font-medium text-gray-700">
//           썸네일 이미지 <span className="text-red-500">*</span>
//         </label>
//         <div className="mt-2 flex items-center">
//           <div className="flex h-32 w-48 items-center justify-center overflow-hidden rounded-md border bg-gray-100">
//             {thumbnail ? (
//               <img src={thumbnail} alt="썸네일" className="h-full w-full object-cover" />
//             ) : (
//               <span className="text-gray-400">이미지 미리보기</span>
//             )}
//           </div>
//           <label htmlFor="thumbnailUpload" className="ml-4 cursor-pointer rounded-md bg-black px-4 py-2 text-white">
//             이미지 업로드
//           </label>
//           <input
//             type="file"
//             id="thumbnailUpload"
//             accept="image/*"
//             className="hidden"
//             {...register("thumbnail", {
//               required: "썸네일 이미지를 업로드해주세요.",
//               onChange: handleThumbnailChange
//             })}
//           />
//         </div>
//         {errors.thumbnail && <p className="text-sm mt-1 text-red-500">{errors.thumbnail.message}</p>}
//         <p className="text-sm mt-1 text-gray-500">
//           추천 사이즈 : 190x250
//           <br />
//           JPG, PNG. 최대 10MB
//         </p>
//       </div>

//       {/* 제출 버튼 */}
//       <button type="submit" className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
//         생성하기
//       </button>
//     </form>
//   );
// };

// export default ChatRoomCreationForm;

// "use client";

// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import Summary from "./_components/Summary";
// import ThumbnailImage from "./_components/ThumbnailImage";
// import Tags from "./_components/TagInput";
// import { useFunnel } from "../_hooks/useFunnel";
// import ProgressBar from "./_components/ProgressBar";
// import { createRoomHandler } from "../_utils/createRoomHandler";
// import { useAuthStore } from "@/lib/store/authStore";

// const steps = ["Summary", "Thumbnail", "HashTags"];

// export interface FormDetails {
//   title: string;
//   subtitle: string;
//   description: string;
//   thumbnail: File;
//   hashtags: string[];
//   category: string;
// }

// const Funnel = () => {
//   const currentUser = useAuthStore((state) => state.user);
//   const { Funnel, Step, next, prev, currentStep } = useFunnel(steps[0]);
//   const methods = useForm<FormDetails>({
//     defaultValues: {
//       title: "",
//       subtitle: "",
//       description: "",
//       thumbnail: undefined,
//       hashtags: [],
//       category: ""
//     }
//   });

//   const currentStepIndex = steps.indexOf(currentStep);

//   const handleNextStep = methods.handleSubmit(() => {
//     next(steps[currentStepIndex + 1]); // 다음 단계로 이동
//   });

//   const handlePrevStep = () => {
//     prev(steps[currentStepIndex - 1]); // 이전 단계로 이동
//   };

//   const handleFormSubmit = methods.handleSubmit(async (data) => {
//     // 로그인 여부 확인
//     if (!currentUser || !currentUser.id) {
//       alert("로그인 상태를 확인해주세요.");
//       return;
//     }

//     // 썸네일 파일 확인
//     if (!data.thumbnail) {
//       alert("썸네일 파일을 선택해주세요.");
//       return;
//     }

//     try {
//       // 채팅방 생성 요청
//       const { success, error } = await createRoomHandler(currentUser.id, data);

//       if (!success) {
//         throw new Error(error);
//       }

//       // 성공 처리
//       alert("채팅방이 성공적으로 생성되었습니다!");
//     } catch (error) {
//       // 에러 처리
//       console.error("채팅방 생성 실패:", error);
//     }
//   });

//   return (
//     <FormProvider {...methods}>
//       <div className="flex h-screen flex-col">
//         <div className="flex-1 p-4">
//           <Funnel>
//             <Step name={steps[0]}>
//               <Summary />
//             </Step>
//             <Step name={steps[1]}>
//               <ThumbnailImage />
//             </Step>
//             <Step name={steps[2]}>
//               <Tags />
//             </Step>
//           </Funnel>
//         </div>

//         <ProgressBar currentStepIndex={currentStepIndex} steps={steps} />

//         <div className="flex justify-between p-4">
//           <button
//             onClick={handlePrevStep}
//             className="rounded-lg bg-gray-200 px-6 py-2 text-black"
//             disabled={currentStepIndex === 0}
//           >
//             이전
//           </button>
//           <button
//             onClick={currentStepIndex === steps.length - 1 ? handleFormSubmit : handleNextStep}
//             className="rounded-lg bg-black px-6 py-2 text-white"
//           >
//             {currentStepIndex === steps.length - 1 ? "완료" : "다음"}
//           </button>
//         </div>
//       </div>
//     </FormProvider>
//   );
// };

// export default Funnel;
