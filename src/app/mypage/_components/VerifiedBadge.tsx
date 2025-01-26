import verifiedBadge from "@/assets/images/verified-badge.svg";
import Image from "next/image";

type VerifiedBadgeProps = {
  isVerified: boolean;
};

const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  return (
    isVerified && (
      <div className="absolute bottom-0 right-0 aspect-square w-[30%] items-center">
        <Image src={verifiedBadge} alt="인증된 유저" width={48} height={48} />
      </div>
    )
  );
};

export default VerifiedBadge;
