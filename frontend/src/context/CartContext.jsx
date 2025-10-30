// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const API_URL = "http://localhost:8085/cart";

  // Fetch cart items when user logs in
  useEffect(() => {
    if (user?.id) {
      fetchCartItems(user.id);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Fetch user's cart from backend
  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    if (!user) return alert("You must log in to add items to cart.");

    try {
      const size = product.size || "default";
      const payload = {
        userId: user.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity: 1,
        image: product.image,
      };

      await axios.post(`${API_URL}/add`, payload);

      setCartItems((prev) => {
        const existing = prev.find(
          (item) => item.productId === product.id && item.size === size
        );
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, payload];
        }
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
