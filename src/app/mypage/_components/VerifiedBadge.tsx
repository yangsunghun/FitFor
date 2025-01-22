import { SealCheck } from "@phosphor-icons/react";

type VerifiedBadgeProps = {
  isVerified: boolean;
};

const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  return (
    isVerified && (
      <div className="absolute -bottom-1 flex -right-1 h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary-default p-2 text-title1 text-white tb:h-6 tb:w-6 tb:border-2 tb:p-1 tb:text-cpation">
        <SealCheck weight="fill" className="w-full h-full"/>
      </div>
    )
  );
};

export default VerifiedBadge;
