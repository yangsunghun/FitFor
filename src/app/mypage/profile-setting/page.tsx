import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ProfileSettingsForm from "./_components/ProfileSettingsForm";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white">
      <div className="mx-auto mt-20 flex w-full tb:mt-4">
        <Link href={"/mypage"}>
          <CaretLeft className="ml-4 mr-2 hidden tb:inline" size={24} />
        </Link>
        <h1 className="mx-auto text-title1 font-bold tb:mx-0 tb:text-title2 tb:font-medium">프로필 편집</h1>
      </div>

      {/* 프로필 변경 폼 */}
      <ProfileSettingsForm />
    </div>
  );
};

export default page;
