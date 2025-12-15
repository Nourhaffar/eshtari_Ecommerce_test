import React from 'react';
import { useCart } from '../../contexts/CartContextBase';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Handle price display (special vs original)
  // Assuming API provides "price" and maybe "special" (discounted price)
  // Adjust based on actual API response structure later.
  const hasSpecial = product.special && product.special !== product.price;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
      <figure className="relative pt-[100%] bg-gray-100 overflow-hidden group">
         {/* Aspect Ratio Square container */}
        <Link to={`/product/${product.id}`} className="absolute inset-0">
          <img 
            src={product.thumb || product.image || "https://placehold.co/400x400?text=No+Image"} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </Link>
        {hasSpecial && (
            <div className="absolute top-2 right-2 badge badge-secondary">
                Sale
            </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 min-h-[3rem]">
            <Link to={`/product/${product.id}`} className="hover:text-primary">
                {product.name}
            </Link>
        </h2>
        
        <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
                {hasSpecial ? (
                    <>
                        <span className="text-gray-400 line-through text-sm">{product.price}</span>
                        <span className="text-lg font-bold text-secondary">{product.special}</span>
                    </>
                ) : (
                    <span className="text-lg font-bold">{product.price}</span>
                )}
            </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-primary btn-sm w-full"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
