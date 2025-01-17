import ProfileSettingsForm from "./_components/ProfileSettingsForm";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white">
      <div className="mt-10 py-8 w-full flex px-[100px]">
        <h1 className="mx-auto text-title1 font-bold">프로필 수정</h1>
      </div>

      {/* 프로필 변경 폼 */}
      <ProfileSettingsForm />
    </div>
  );
};

export default page;
