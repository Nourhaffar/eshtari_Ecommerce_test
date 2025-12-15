import { useState, useEffect } from "react";
import { CartContext } from "./CartContextBase";

export const CartProvider = ({ children }) => {
  // Lazy initialization - only runs once on mount
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("eshtari_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("eshtari_cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === product.product_id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.product_id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
  };
  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

