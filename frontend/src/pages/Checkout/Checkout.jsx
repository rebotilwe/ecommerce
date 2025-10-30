import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Safe total calculation
  const totalAmount = cartItems.reduce((sum, item) => {
    let price = 0;
    if (Array.isArray(item.price)) {
      const sizeIndex = item.sizes?.indexOf(item.size) ?? 0;
      price = item.price[sizeIndex] || 0;
    } else if (typeof item.price === "string") {
      price = parseFloat(item.price.replace("R", "").trim()) || 0;
    } else if (typeof item.price === "number") {
      price = item.price;
    }
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleCheckout = async () => {
    if (!user) {
      setMessage("You must be logged in to checkout.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8085/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          totalAmount,
          cartItems,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/products"), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Error placing order.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="checkout-items">
              {cartItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} ({item.size}) x {item.quantity}
                </li>
              ))}
            </ul>
            <h3>Total: R{totalAmount.toFixed(2)}</h3>

            <button
              className="btn btn-success"
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0 || !user}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

            {message && <p className="checkout-message">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
