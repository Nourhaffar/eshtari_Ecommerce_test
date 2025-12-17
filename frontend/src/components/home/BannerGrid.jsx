import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const getPageSize = () => {
  if (typeof window === "undefined") return 12;
  const width = window.innerWidth;

  if (width <= 600) return 6;
  if (width <= 1024) return 8;

  return 12;
};

const BannerGrid = ({ banners = [] }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [banners, pageSize]);

  const { pageBanners, totalPages } = useMemo(() => {
    if (!banners.length) return { pageBanners: [], totalPages: 0 };

    const size = Math.max(1, pageSize);
    const count = Math.ceil(banners.length / size);
    const start = page * size;
    const sliced = banners.slice(start, start + size);

    return { pageBanners: sliced, totalPages: count };
  }, [banners, page, pageSize]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="mb-12 relative group/container">
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm opacity-70">
            Page {page + 1} / {totalPages}
          </span>
        </div>
      )}

      {totalPages > 1 && (
        <>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 p-2 rounded-full bg-base-100 shadow-lg hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 p-2 rounded-full bg-base-100 shadow-lg hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="h-[400px] grid grid-rows-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {pageBanners.map((banner, index) => {
          const uniqueKey = banner.id || banner.mobile_widget_id || `${page}-${index}`;
          const imageSrc = banner.image_path || banner.image || banner.thumb;
          const altText = banner.title || `Banner ${index + 1}`;

          return (
            <Link to={"/filtered"} key={uniqueKey}>
              <div className="relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full w-full group bg-base-100">
                <img
                  src={imageSrc}
                  alt={altText}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="p-4 w-full transform transition-transform duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 drop-shadow-md">
                      {banner.title}
                    </h3>
                    <span className="inline-block mt-2 text-xs text-white/90 font-medium border-b border-white/50 pb-0.5">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-1.5 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? "page" : undefined}
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
