import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { product_id, image_path, thumb, name, price, special } = product;

  return (
    <Link 
      to={`/product/${product_id}`}
      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <figure className="relative overflow-hidden bg-base-200 aspect-square">
        <img
          src={image_path || thumb}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {special && (
          <div className="absolute top-2 right-2 badge badge-error badge-lg font-bold">
            Sale
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-2 min-h-[3rem]">
          {name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          {special ? (
            <>
              <span className="text-xl font-bold text-error">{special}</span>
              <span className="text-sm line-through opacity-60">{price}</span>
            </>
          ) : (
            <span className="text-xl font-bold">{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
