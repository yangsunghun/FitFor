import { Tags } from "../ui/Tags";

const GridSkeleton = () => {
  return (
    <li className="relative mb-4">
      <figure className="skeleton-effect aspect-square rounded-2xl"></figure>

      <p className="skeleton-effect2 mt-4 h-6"></p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[...Array(3)].map((_, index) => (
          <Tags key={index} variant="gray" size="md" label="　　　" />
        ))}
      </div>
    </li>
  );
};

export default GridSkeleton;
