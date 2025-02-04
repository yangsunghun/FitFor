import { cn } from "@/lib/utils/common/className";

type StatsCardProps = {
  title: string;
  value: number;
  className?: string;
};
const StatCard = ({ title, value, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "container inline-flex h-[7.5rem] flex-col items-center justify-center gap-1 rounded-2xl p-6 text-center shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] tb:h-auto tb:p-4 tb:shadow-none",
        className
      )}
    >
      <p className="text-title2 font-medium text-primary-default tb:text-body">{value}</p>
      <p className="text-body font-medium tb:text-caption">{title}</p>
    </div>
  );
};

export default StatCard;
