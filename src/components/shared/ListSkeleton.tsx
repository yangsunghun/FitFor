import { Tags } from "../ui/Tags";

const ListSkeleton = () => {
  return (
    <li className="relative mb-6 flex gap-6 py-4">
      <div className="skeleton-effect h-[11.25rem] w-[11.25rem] rounded-2xl"></div>

      <div className="relative w-[calc(100%-12.75rem)]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="skeleton-effect relative h-10 w-10 rounded-full"></div>
            <div>
              <p className="skeleton-effect2 h-4 w-10"></p>
              <p className="skeleton-effect2 mt-1 h-3 w-16"></p>
            </div>
          </div>
        </div>

        <p className="skeleton-effect2 mt-4 h-4 w-1/2"></p>

        <div className="absolute bottom-0 right-0 z-20 flex gap-4 text-title2 font-medium leading-7 text-text-03">
          <div className="skeleton-effect h-6 w-20"></div>
        </div>

        <div className="absolute bottom-0 left-0 flex gap-2">
          {[...Array(5)].map((_, index) => (
            <Tags key={index} variant="gray" size="md" label="　　　" />
          ))}
        </div>
      </div>
    </li>
  );
};

export default ListSkeleton;
