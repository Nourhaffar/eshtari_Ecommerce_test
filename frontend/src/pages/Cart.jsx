import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContextBase';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.special || item.price) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="p-4 border-b last:border-b-0 flex gap-4 items-center"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-base-200 rounded-md overflow-hidden">
                  <img
                    src={item.image_path || item.thumb}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product_id}`}
                    className="font-bold text-lg hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <div className="text-sm text-gray-500 mb-2">SKU: {item.sku}</div>
                  <div className="font-semibold text-primary">
                    {parseFloat(item.special || item.price).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="btn btn-xs btn-circle btn-ghost border-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="btn btn-xs btn-circle btn-ghost border-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="btn btn-ghost btn-circle text-error"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-base-100 rounded-lg shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 text-sm">Calculated at checkout</span>
            </div>
            
            <div className="divider my-2"></div>
            
            <div className="flex justify-between mb-6 text-lg font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary w-full text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
