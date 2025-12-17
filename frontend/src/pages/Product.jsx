import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../services/api.js';
import { useCart } from '../contexts/CartContextBase';
import { useAuth } from '../contexts/AuthContextBase';
import SEO from '../components/common/SEO.jsx';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductDetail(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
        navigate('/login');
        return;
    }

    if (product && product.data) {
      addToCart({
        product_id: product.data.product_id,
        name: product.data.name,
        price: product.data.special || product.data.price,
        thumb: product.data.thumb,
        quantity: quantity
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="skeleton h-96 w-full rounded-lg mb-4"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-20 w-20 rounded-lg"></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4"></div>
            <div className="skeleton h-6 w-1/4"></div>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  if (!product || !product.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Product not found.</span>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  const productData = product.data;
  const images = productData.images || [{ thumb: productData.thumb, popup: productData.thumb }];

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={`${productData.name} - Eshtari`} 
        description={`Buy ${productData.name} at the best price. ${productData.description ? productData.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''}`}
        type="product"
      />
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><a onClick={() => navigate('/')} className="cursor-pointer">Home</a></li>
          <li>Products</li>
          <li className="font-semibold">{productData.name}</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative overflow-hidden rounded-lg shadow-xl mb-4 bg-base-200 aspect-square">
            <img
              src={images[selectedImage]?.popup || images[selectedImage]?.thumb || productData.thumb}
              alt={productData.name}
              className="w-full h-full object-cover"
            />
            {productData.special && (
              <div className="absolute top-4 right-4 badge badge-error badge-lg font-bold">
                Sale
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary scale-105' 
                      : 'border-base-300 hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image.thumb}
                    alt={`${productData.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{productData.name}</h1>

          <div className="flex items-center gap-4">
            {productData.special ? (
              <>
                <span className="text-4xl font-bold text-error">{productData.special}</span>
                <span className="text-2xl line-through opacity-60">{productData.price}</span>
              </>
            ) : (
              <span className="text-4xl font-bold">{productData.price}</span>
            )}
          </div>

          {productData.description && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <div 
                className={`transition-all duration-300 ${isDescriptionExpanded ? 'max-h-[300px] overflow-y-auto pr-2' : 'max-h-[150px] overflow-hidden relative'}`}
              >
                <div dangerouslySetInnerHTML={{ __html: productData.description }} />
                {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-100 to-transparent"></div>
                )}
              </div>
              
              {productData.description.length > 300 && (
                  <button 
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="btn btn-link btn-sm pl-0 mt-1 no-underline hover:text-primary transition-colors font-semibold"
                  >
                    {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                  </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="join">
              <button 
                onClick={decrementQuantity}
                className="btn btn-sm join-item"
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="input input-sm join-item w-16 text-center"
                min="1"
              />
              <button 
                onClick={incrementQuantity}
                className="btn btn-sm join-item"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`btn btn-primary btn-lg w-full ${addedToCart ? 'btn-success' : ''}`}
          >
            {addedToCart ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>

          {productData.manufacturer && (
            <div className="border-t pt-4">
              <p className="text-sm"><span className="font-semibold">Brand:</span> {productData.manufacturer}</p>
            </div>
          )}
          
          {productData.model && (
            <div>
              <p className="text-sm"><span className="font-semibold">Model:</span> {productData.model}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
