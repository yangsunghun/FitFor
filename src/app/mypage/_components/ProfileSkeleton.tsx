import { Button } from "@/components/ui/Button";

const ProfileSkeleton = () => {
  return (
    <div className="mb-20 mt-11 flex h-40 w-[40.5rem] flex-row items-center">
      <div className="over-flow-hidden relative h-40 w-40 animate-pulse rounded-full bg-gray-200" />
      <div className="relative ml-20 flex h-full w-full max-w-96 flex-col">
        <div className="mb-2 h-9 w-2/4 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        <Button asChild variant="secondary" size="sm" className="absolute bottom-0 left-0">
          <div>프로필 편집</div>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
