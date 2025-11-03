// src/pages/Checkout/Checkout.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    toast.error("You must log in to checkout!");
    navigate("/login");
    return null;
  }

  // Helper to get price of each item
  const getPrice = (item) => {
    if (Array.isArray(item.price)) {
      const idx = item.sizes?.indexOf(item.size) ?? 0;
      return item.price[idx] || 0;
    } else if (typeof item.price === "number") {
      return item.price;
    } else if (typeof item.price === "string") {
      return parseFloat(item.price.replace("R", "")) || 0;
    }
    return 0;
  };

  // Calculate total in ZAR
  const totalZAR = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * (item.quantity || 1),
    0
  );

  // Paystack expects smallest currency unit (cents)
  const amountCents = totalZAR * 100;

  const handleCheckout = () => {
    if (!window.PaystackPop) {
      toast.error("Payment system not loaded. Try again later.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: amountCents,
      currency: "ZAR", // match your account currency
      callback: function (response) {
        console.log("Payment complete!", response);
        toast.success("Payment successful!");
        clearCart();
        navigate("/success");
      },
      onClose: function () {
        toast.error("Payment was closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} ({item.size || "default"}) x {item.quantity} - R
                  {(getPrice(item) * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: R{totalZAR.toFixed(2)}</h3>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
