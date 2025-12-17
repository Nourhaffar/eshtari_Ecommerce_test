import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { product_id, image_path, thumb, name, price, special } = product;

  return (
    <Link 
      to={`/product/${product_id}`}
      className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full"
    >
      <figure className="relative overflow-hidden bg-base-200 aspect-[4/5] sm:aspect-square">
        <img
          src={image_path || thumb}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
        />
        {special && (
          <div className="absolute top-2 right-2 badge badge-error badge-lg font-bold shadow-sm z-10">
            Sale
          </div>
        )}
        
        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center bg-gradient-to-t from-black/50 to-transparent pt-10">
            <button className="btn btn-error btn-sm w-full shadow-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                View Details
            </button>
        </div>
      </figure>
      
      <div className="card-body p-4 gap-1">
        <h3 className="card-title text-sm md:text-base line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          {special ? (
            <>
              <span className="text-lg font-bold text-error">{special}</span>
              <span className="text-xs text-base-content/50 line-through decoration-1">{price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
