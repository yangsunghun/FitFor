import verifiedBadge from "@/assets/images/verified-mark.svg";
import Image from "next/image";

type VerifiedBadgeProps = {
  isVerified: boolean;
};

const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  return (
    isVerified && (
      <div className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-primary-default p-2">
        <Image src={verifiedBadge} alt="verified badge" width={24} height={24} className="size-fit" />
      </div>
    )
  );
};

export default VerifiedBadge;
