const StatCardsSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-6 divide-x divide-line-02 tb:my-4 tb:gap-0 tb:rounded-lg tb:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] tb:shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] mb:max-h-20">
      {[...Array(3)].map((_, index) => (
        <div
          key={`skeletonStatsCard_${index}`}
          className="container inline-flex h-[7.25rem] animate-pulse flex-col items-center justify-center rounded-2xl p-6 text-center shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)] tb:h-auto tb:border-none tb:p-4 tb:shadow-none"
        >
          <div className="mb-2 mt-0 h-6 w-1/2 rounded bg-gray-300 tb:h-4"></div>
          <div className="mt-2 h-5 w-3/4 rounded bg-gray-300 tb:h-4"></div>
        </div>
      ))}
    </div>
  );
};

export default StatCardsSkeleton;
