export default function ProductSkeleton({ count = 12 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-64 bg-gray-200" />
          <div className="p-5">
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="flex items-center justify-between mt-4">
              <div className="h-8 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-3" />
          </div>
        </div>
      ))}
    </>
  );
}

