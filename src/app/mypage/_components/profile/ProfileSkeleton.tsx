const ProfileSkeleton = () => {
  return (
    <div className="my-20 flex h-40 w-[40.5rem] flex-row items-center tb:my-10 tb:h-auto tb:w-[21.438rem] tb:flex-col tb:gap-4 mb:w-[19rem]">
      <div className="over-flow-hidden relative h-40 w-40 animate-pulse rounded-full bg-gray-200 tb:max-h-20 tb:max-w-20" />
      <div className="relative ml-20 flex h-full w-full max-w-96 flex-col gap-2 tb:ml-0 tb:h-[4.688rem] tb:w-full tb:items-center mb:w-[19rem]">
        <div className="mb-2 h-9 w-2/4 animate-pulse rounded bg-gray-200 tb:h-5" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
