import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };

  const addCart = (item, quantity) => {
    const exist = cart.some(i => i.id === item.id);

    if (exist) {
      const newCart = cart.map(product => {
        if (product.id === item.id) {
          return { ...product, quantity: product.quantity + quantity };
        } else {
          return product;
        }
      });
      setCart(newCart);
    } else {
      setCart(prev => {
        return [...prev, { ...item, quantity }];
      });
    }
  };

  const restCart = id => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity -= 1;
      if (updatedCart[index].quantity === 0) {
        updatedCart.splice(index, 1);
      }
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, clearCart, addCart, restCart }}>
      {children}
    </CartContext.Provider>
  );
}