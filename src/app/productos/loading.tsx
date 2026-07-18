export default function LoadingProductos() {
  return (
    <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 animate-pulse">
      <div className="h-3 w-40 bg-carbon-700 rounded-xs mb-6" />
      <div className="mb-8">
        <div className="h-8 w-64 bg-carbon-700 rounded-xs mb-3" />
        <div className="h-4 w-96 max-w-full bg-carbon-700 rounded-xs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-8 xl:gap-10">
        <div className="hidden lg:block space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 bg-carbon-700 rounded-xs" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-carbon-800 border border-black/5">
              <div className="aspect-[4/3] bg-carbon-700" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-20 bg-carbon-700 rounded-xs" />
                <div className="h-4 w-full bg-carbon-700 rounded-xs" />
                <div className="h-3 w-3/4 bg-carbon-700 rounded-xs" />
                <div className="h-9 w-full bg-carbon-700 rounded-xs mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
