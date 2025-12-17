import { useMemo, useState, useEffect } from "react";

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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 p-2 rounded-full bg-base-100 shadow-lg hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
                aria-label="Next page"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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
              className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-square group"
            >
              <img
                src={imageSrc}
                alt={altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />

              {banner.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 w-full">
                    <h3 className="text-white font-semibold text-xs md:text-sm line-clamp-2">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              )}
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
