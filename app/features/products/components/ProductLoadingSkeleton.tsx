export function ProductLoadingSkeleton() {
  return (
    <section
      aria-label="Loading products"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          {/* Image skeleton */}
          <div className="h-48 bg-gray-200" />

          {/* Content skeleton */}
          <div className="p-4">
            {/* Title */}
            <div className="mb-2 h-6 rounded bg-gray-200" />

            {/* Description */}
            <div className="mb-4 space-y-2">
              <div className="h-4 rounded bg-gray-100" />
              <div className="h-4 w-3/4 rounded bg-gray-100" />
            </div>

            {/* Price and rating */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-4 w-12 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
