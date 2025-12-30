const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const UniversityCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default Skeleton;









