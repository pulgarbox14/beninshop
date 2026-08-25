import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'beninshop_cart';

/**
 * Panier de l'utilisateur, conserve dans le localStorage.
 * Chaque ligne contient le produit renvoye par l'API et une quantite.
 */
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === product._id);

      if (existing) {
        return current.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      }

      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: product.stock,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock || 99)) } : item
      )
    );
  };

  const removeItem = (id) => setItems((current) => current.filter((item) => item._id !== id));

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          totalItems: acc.totalItems + item.quantity,
          totalPrice: acc.totalPrice + item.price * item.quantity,
        }),
        { totalItems: 0, totalPrice: 0 }
      ),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clearCart, totalItems, totalPrice }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit etre utilise a l'interieur de CartProvider");
  }

  return context;
};
