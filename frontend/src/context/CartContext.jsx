// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";
import { products } from "../data/productsData.js"; // Import products for price lookup

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const API_URL = "http://localhost:8085/cart";

  useEffect(() => {
    if (user?.id) fetchCartItems(user.id);
    else setCartItems([]);
  }, [user]);

  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      // Merge product info (name, image, sizes, price) from productsData
      const mergedCart = res.data.map((item) => {
        const prod = products.find((p) => p.id === item.product_id);
        return {
          ...item,
          name: prod?.name || "Unknown",
          image: prod?.image || "",
          sizes: prod?.sizes || [],
          price: prod?.price || [0],
        };
      });
      setCartItems(mergedCart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };
const addToCart = async ({ id: productId, size, price }) => {
  if (!user) return alert("You must log in to add items to cart.");

  const safeSize = size && size.trim() !== "" ? size : "default";

  const payload = {
    userId: user.id,
    productId,
    size: safeSize,
    quantity: 1,
    price, // ✅ add price here
  };

  console.log("Adding to cart payload:", payload);

  try {
    const res = await axios.post(`${API_URL}/add`, payload);
    console.log("✅ Added to cart response:", res.data);

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.size === safeSize
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.size === safeSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, payload];
      }
    });
  } catch (err) {
    if (err.response) {
      console.error("❌ Backend error adding to cart:", err.response.data);
    } else {
      console.error("❌ Axios error adding to cart:", err);
    }
  }
};





  const removeFromCart = async (productId, size) => {
    try {
      await axios.delete(`${API_URL}/remove`, {
        data: { userId: user.id, productId, size },
      });
      setCartItems((prev) =>
        prev.filter(
          (item) => !(item.product_id === productId && item.size === size)
        )
      );
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/clear/${user.id}`);
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
