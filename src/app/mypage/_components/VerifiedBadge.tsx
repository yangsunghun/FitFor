import VerifiedBadgeMark from "@/assets/images/VerifiedBadge";

type VerifiedBadgeProps = {
  isVerified: boolean;
};

const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  return (
    isVerified && (
      <div className="absolute bottom-0 right-0 aspect-square w-[30%] items-center">
        <VerifiedBadgeMark className="max-h-full max-w-full" />
      </div>
    )
  );
};

export default VerifiedBadge;
