import ProfileSettingsForm from "./_components/ProfileSettingsForm";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white p-6">
      <h1 className="text-title mb-8 font-bold">프로필 수정</h1>

      {/* 프로필 변경 폼 */}
      <ProfileSettingsForm />
    </div>
  );
};

export default page;
