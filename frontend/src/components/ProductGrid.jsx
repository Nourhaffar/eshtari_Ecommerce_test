import ProductCard from './ProductCard';

const ProductGrid = ({ title, products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* Section Header */}
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.product_id || index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
