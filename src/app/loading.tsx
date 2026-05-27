// 骨架屏加载状态
function CategorySkeleton() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#f5f5f5] rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 bg-[#f5f5f5] rounded w-24 mb-2"></div>
          <div className="h-3 bg-[#f5f5f5] rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

function PromptSkeleton() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 animate-pulse">
      <div className="h-5 bg-[#f5f5f5] rounded w-32 mb-3"></div>
      <div className="h-4 bg-[#f5f5f5] rounded w-full mb-2"></div>
      <div className="h-4 bg-[#f5f5f5] rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-[#f5f5f5] rounded w-20"></div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#f5f5f5] rounded animate-pulse"></div>
            <div className="h-5 bg-[#f5f5f5] rounded w-28 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-[#f5f5f5] rounded w-12 animate-pulse"></div>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="h-12 bg-[#f5f5f5] rounded w-72 mb-5 animate-pulse"></div>
            <div className="h-4 bg-[#f5f5f5] rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-[#f5f5f5] rounded w-80 mb-8 animate-pulse"></div>
            <div className="h-12 bg-[#f5f5f5] rounded w-full max-w-md animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-12 border-t border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-6 bg-[#f5f5f5] rounded w-20 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Prompts Skeleton */}
      <section className="py-12 border-t border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-6 bg-[#f5f5f5] rounded w-24 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <PromptSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
