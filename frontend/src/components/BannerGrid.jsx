const BannerGrid = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="grid grid-cols-[auto,1fr] md:grid-cols-3 lg:grid-cols-4 gap-4">
        {banners.map((banner, index) => (
          <div 
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer aspect-square"
          >
            <img
              src={banner.image_path || banner.image || banner.thumb}
              alt={banner.title || `Promotional banner ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            {banner.title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm md:text-base">
                    {banner.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerGrid;
