import SignoutButton from "./_components/SignoutButton";

const PrivatePage = () => {
  return (
    <div className="h-screen w-full justify-items-center bg-gray-400 p-8">
      <p>Hello User</p>
      <SignoutButton />
    </div>
  );
}

export default PrivatePage;