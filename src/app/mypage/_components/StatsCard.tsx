type StatsCardProps = {
  title: string;
  value: number;
  total?: number;
}
const StatsCard = ({ title, value, total }: StatsCardProps) => {
  return (
    <div className="rounded-lg bg-gray-100 p-6 text-center">
      <h3 className="text-lg mb-2 font-medium">{title}</h3>
      <p className="text-xl">
        {value}
        {total && <span className="text-gray-500"> / {total}</span>}
      </p>
    </div>
  );
};

export default StatsCard;
