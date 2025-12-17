import ProductCard from './ProductCard';

import ScrollReveal from '../common/ScrollReveal';

const ProductGrid = ({ title, products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {title && (
        <ScrollReveal mode="slide-right">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
        </ScrollReveal>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ScrollReveal key={product.product_id || index} delay={index * 50} mode="fade-up" className="h-full">
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
