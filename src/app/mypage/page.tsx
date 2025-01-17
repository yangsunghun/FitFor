import MypageMenu from "./_components/MypageMenu";
import ProfileSection from "./_components/ProfileSection";
import SignoutButton from "./_components/SignoutButton";

const PrivatePage = () => {
  return (
    <div className="h-screen mx-auto max-w-[62.25rem] justify-items-center">
      <ProfileSection />
      <MypageMenu />
    </div>
  );
};

export default PrivatePage;
