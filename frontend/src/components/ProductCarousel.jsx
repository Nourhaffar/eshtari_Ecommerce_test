import { useRef } from 'react';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = ({ title, products }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <ScrollReveal mode="slide-right">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </ScrollReveal>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="btn btn-circle btn-sm md:btn-md bg-base-100 shadow hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300"
            aria-label="Scroll left"
          >
                <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="btn btn-circle btn-sm md:btn-md bg-base-100 shadow hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300"
            aria-label="Scroll right"
          >
                <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => (
          <div key={product.product_id || index} className="flex-none w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
