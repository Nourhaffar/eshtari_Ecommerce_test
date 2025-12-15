import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ banners = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!banners || banners.length === 0) return null;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000); // 5 seconds auto slide
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <div className="carousel w-full relative h-[300px] md:h-[400px] rounded-box overflow-hidden">
            {banners.map((banner, index) => (
                <div 
                    key={index} 
                    className={`carousel-item relative w-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 block' : 'opacity-0 hidden block absolute top-0 left-0'}`}
                >
                    <img src={banner.image} className="w-full h-full object-cover" alt={banner.title} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => setCurrentSlide((currentSlide - 1 + banners.length) % banners.length)} className="btn btn-circle btn-ghost text-white">❮</button>
                        <button onClick={() => setCurrentSlide((currentSlide + 1) % banners.length)} className="btn btn-circle btn-ghost text-white">❯</button>
                    </div>
                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white text-center">
                        <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                        {banner.link && (
                            <Link to={banner.link} className="btn btn-primary btn-sm">Shop Now</Link>
                        )}
                    </div>
                </div>
            ))}
             <div className="absolute flex justify-center w-full py-2 gap-2 bottom-2">
                {banners.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-white/50'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
