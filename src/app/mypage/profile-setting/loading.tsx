import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";

const loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white">
      <div className="mx-auto mt-20 flex w-full tb:mt-4">
        <CaretLeft className="ml-4 mr-2 hidden tb:inline" size={24} />
        <h1 className="mx-auto text-title1 font-bold tb:mx-0 tb:text-title2 tb:font-medium">프로필 편집</h1>
      </div>

      {/* 프로필 변경 폼 스켈레톤 */}
      <div className="mx-auto mt-10 flex w-2/4 flex-col items-center tb:mx-4 tb:w-[21.375rem] tb:gap-6">
        {/* 프로필 이미지 */}
        <div className="relative mb-20 flex h-[12.5rem] w-[12.5rem] animate-pulse items-center justify-center rounded-full bg-gray-300 tb:h-[7.5rem] tb:w-[7.5rem]" />
        {/* 선택지 */}
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default loading;
