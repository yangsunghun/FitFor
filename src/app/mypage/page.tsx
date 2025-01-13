import MypageMenu from "./_components/MypageMenu";
import ProfileSection from "./_components/ProfileSection";
import SignoutButton from "./_components/SignoutButton";

const PrivatePage = () => {
  return (
    <div className="h-screen w-full justify-items-center p-8">
      <ProfileSection />
      <MypageMenu />
      <SignoutButton />
    </div>
  );
};

export default PrivatePage;
