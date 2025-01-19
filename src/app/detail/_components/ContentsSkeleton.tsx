import { Tags } from "@/components/ui/Tags";

const ContentsSkeleton = () => {
  return (
    <>
      <article className="flex justify-between">
        <div className="skeleton-effect aspect-square w-[48%] rounded-2xl"></div>
        <div className="relative w-[46%]">
          <div className="flex items-center gap-4">
            <div className="skeleton-effect h-12 w-12 rounded-full"></div>
            <div>
              <p className="skeleton-effect2 h-4 w-10"></p>
              <p className="skeleton-effect2 mt-1 h-3 w-16"></p>
            </div>
          </div>

          <p className="skeleton-effect2 mt-6 h-6 w-full"></p>
          <p className="skeleton-effect2 mt-2 h-6 w-1/2"></p>

          <div className="mt-10 flex flex-wrap gap-2">
            {[...Array(5)].map((_, index) => (
              <Tags key={index} variant="gray" size="md" label="　　　" />
            ))}
          </div>
          <p className="skeleton-effect2 mt-4 h-4 w-24"></p>

          <div className="absolute bottom-0 left-0 mt-[6.35rem] flex gap-10 font-medium">
            <div className="skeleton-effect h-12 w-8"></div>
            <div className="skeleton-effect h-12 w-8"></div>
            <div className="skeleton-effect h-12 w-8"></div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ContentsSkeleton;