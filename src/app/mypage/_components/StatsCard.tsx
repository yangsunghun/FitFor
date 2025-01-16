type StatsCardProps = {
  title: string;
  value: number;
  total?: number;
};
const StatsCard = ({ title, value, total = 500 }: StatsCardProps) => {
  return (
    <div className="container h-[7.5rem] inline-flex flex-col items-center justify-center gap-1 rounded-2xl p-6 text-center shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <h3 className="mb-1 text-title2 font-bold">{title}</h3>
      <p className="text-title2 font-medium text-black">
        <span className="text-primary-default">{value}</span>
        {total && <span> / {total}</span>}
      </p>
    </div>
  );
};

export default StatsCard;
