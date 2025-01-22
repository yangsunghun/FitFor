import { VERIFICATION_THRESHOLD } from "@/lib/constants/constants";
import { cn } from "@/lib/utils/common/className";

type StatsCardProps = {
  title: string;
  value: number;
  className?: string;
};
const StatsCard = ({ title, value, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "container inline-flex h-[7.5rem] flex-col items-center justify-center gap-1 rounded-2xl p-6 mb:p-4 mb:h-auto text-center shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <h3 className="mb-1 text-title2 font-bold mb:text-caption tb:text-body tb:font-medium">{title}</h3>
      <p className="text-title2 font-medium text-black tb:text-body">
        <span className="text-primary-default">{value}</span>
        <span className="inline tb:hidden"> / {VERIFICATION_THRESHOLD}</span>
      </p>
    </div>
  );
};

export default StatsCard;
