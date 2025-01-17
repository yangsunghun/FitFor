import MypageMenu from "./_components/MypageMenu";
import ProfileSection from "./_components/ProfileSection";

const PrivatePage = () => {
  return (
    <div className="mx-auto h-screen max-w-[62.25rem] justify-items-center">
      <ProfileSection />
      <MypageMenu />
    </div>
  );
};

export default PrivatePage;
