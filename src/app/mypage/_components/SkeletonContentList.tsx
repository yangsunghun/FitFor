const ContentListSkeleton = () => {
  return (
    <section className="my-12 animate-pulse">
      {/* Title and Subtitle */}
      <div className="mb-4">
        <div className="mb-2 h-4 w-24 rounded bg-gray-300"></div>
        <div className="h-6 w-48 rounded bg-gray-300"></div>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {/* Placeholder Boxes */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="aspect-square rounded-lg bg-gray-200"></div>
        ))}
      </div>
    </section>
  );
};

export default ContentListSkeleton;
