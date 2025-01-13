import MypageMenu from "./_components/MypageMenu";
import ProfileSection from "./_components/ProfileSection";
import SignoutButton from "./_components/SignoutButton";

const PrivatePage = () => {
  return (
    <div className="h-screen w-full justify-items-center">
      <div className="container mx-auto max-w-7xl my-8">
        <h1 className="justify-self-start text-heading font-bold">마이페이지</h1>
      </div>
      <ProfileSection />
      <MypageMenu />
      <SignoutButton />
    </div>
  );
};

export default PrivatePage;
