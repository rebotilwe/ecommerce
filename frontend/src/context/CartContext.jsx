// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const API_URL = "http://localhost:8085/cart";

  // Fetch cart when user changes
  useEffect(() => {
    if (user?.id) fetchCartItems(user.id);
    else setCartItems([]);
  }, [user]);

  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

const addToCart = async ({ productId, id, name, size, price, image, quantity = 1 }) => {
  if (!user) return alert("You must log in to add items to cart.");

  // Fix id/productId mapping if needed
  const idToUse = productId || id;
  if (!idToUse) {
    console.error("Missing productId or id in addToCart payload");
    return;
  }

  const safeSize = size && size.trim() !== "" ? size : "default";

  const payload = {
    userId: user.id,
    productId: idToUse,
    name,
    size: safeSize,
    quantity,
    price,
    image,
  };

  console.log("Adding to cart payload:", payload);

  try {
    await axios.post(`${API_URL}/add`, payload);

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === idToUse && item.size === safeSize
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === idToUse && item.size === safeSize
            ? { ...item, quantity: item.quantity + quantity }
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

const removeFromCart = async (productId, size) => {
  if (!user) return;

  const safeSize = size && size.trim() !== "" ? size : "default";

  console.log("Removing from cart payload:", {
    userId: user.id,
    productId,
    size: safeSize,
  });

  try {
    await axios.delete(`${API_URL}/remove`, {
      data: { userId: user.id, productId, size: safeSize },
    });
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === safeSize)
      )
    );
  } catch (err) {
    console.error("Error removing from cart:", err);
  }
};



  // Clear entire cart
  const clearCart = async () => {
    if (!user) return;
    try {
      await axios.delete(`${API_URL}/clear/${user.id}`);
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };
  const updateQuantity = async (productId, size, newQuantity) => {
  if (!user) return;
  const safeSize = size && size.trim() !== "" ? size : "default";
  try {
    await axios.put(`${API_URL}/update-quantity`, {
      userId: user.id,
      productId,
      size: safeSize,
      quantity: newQuantity,
    });
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === safeSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};

  // Total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, totalItems }}>
    {children}
  </CartContext.Provider>
  );
};
