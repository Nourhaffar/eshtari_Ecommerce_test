import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 12;

const BannerGrid = ({ banners = [] }) => {
  const [page, setPage] = useState(0);

  // Reset page when banners source changes
  useEffect(() => {
    setPage(0);
  }, [banners]);

  // Memoize pagination logic
  const { pageBanners, totalPages } = useMemo(() => {
    if (!banners.length) return { pageBanners: [], totalPages: 0 };
    
    const count = Math.ceil(banners.length / PAGE_SIZE);
    const start = page * PAGE_SIZE;
    const sliced = banners.slice(start, start + PAGE_SIZE);
    
    return { pageBanners: sliced, totalPages: count };
  }, [banners, page]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="mb-12 relative group/container">
      {/* Header + Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm opacity-70">
            Page {page + 1} / {totalPages}
          </span>
        </div>
      )}

      {/* Navigation Buttons - Visible on hover/always on touch */}
      {totalPages > 1 && (
        <>
            <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 p-2 rounded-full bg-base-100 shadow-lg hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
                aria-label="Previous page"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 p-2 rounded-full bg-base-100 shadow-lg hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
                aria-label="Next page"
            >
                <ChevronRight size={24} />
            </button>
        </>
      )}

      {/* Grid Iteration */}
      <div className="lg:h-[400px] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {pageBanners.map((banner, index) => {
          // Fallback key strategy
          const uniqueKey = banner.id || banner.mobile_widget_id || `${page}-${index}`;
          const imageSrc = banner.image_path || banner.image || banner.thumb;
          const altText = banner.title || `Banner ${index + 1}`;

          return (
            <div
              key={uniqueKey}
              className="relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer aspect-square group bg-base-100"
            >
              <img
                src={imageSrc}
                alt={altText}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay with gradient - visible on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="p-4 w-full transform transition-transform duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 drop-shadow-md">
                    {banner.title}
                  </h3>
                   {/* Optional: Add a 'View' indicator or minimal text if available */}
                  <span className="inline-block mt-2 text-xs text-white/90 font-medium border-b border-white/50 pb-0.5">Shop Now</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-1.5 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? 'page' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-primary" : "w-2 bg-base-300 hover:bg-base-content/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerGrid;
