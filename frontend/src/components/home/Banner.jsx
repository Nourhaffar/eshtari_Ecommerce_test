import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = ({ banners }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = {
    title : "Take care of your car… and leave the rest to us.",
    description : "Discover the best genuine spare parts and accessories that give your car enhanced performance, safety, and a stylish look. Exclusive offers and guaranteed quality.",
    btn: "Shop Now",
  }
  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) {
    return null;
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg shadow-xl group">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={banner.image_path || banner.image || banner.thumb}
              alt={banner.title || `Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start">
              <div className={`p-6 md:p-12 text-white transition-all duration-700 transform w-full md:w-3/4 lg:w-1/2 ${
                  index === currentIndex ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"
                }`}>
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg leading-tight line-clamp-2 md:line-clamp-none">
                  {data.title}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl opacity-90 drop-shadow-md mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                  {data.description}
                </p>
                <button 
                  className="btn btn-primary btn-sm md:btn-md border-none shadow-lg hover:scale-105 transition-transform no-animation" 
                  onClick={() => navigate('/filtered')}
                >
                  {data.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-white/80 hover:bg-white border-0 opacity-0 -translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out z-10 shadow-lg"
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-white/80 hover:bg-white border-0 opacity-0 translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out z-10 shadow-lg"
            aria-label="Next slide"
          >
            ❯
          </button>
        </>
      )}

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <div 
                key={index}
                className="transition-all duration-300 ease-out transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: `${index * 50}ms` }}
            >
                <button
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    index === currentIndex 
                    ? 'bg-white w-6 md:w-8 shadow-md' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
