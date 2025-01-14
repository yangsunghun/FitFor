const ContentListSkeleton = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <section className="my-12">
      <div className="mb-4">
        <p className="text-body text-gray-600">{subtitle}</p>
        <h2 className="text-title1 font-bold">{title}</h2>
      </div>
      <div className="flex flex-row gap-8 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative aspect-square h-[216px] w-[180px] flex-shrink-0 animate-pulse content-center justify-items-center overflow-hidden rounded-lg bg-gray-200"
          >
            <div className="relative h-full w-full bg-gray-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentListSkeleton;
