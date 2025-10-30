// src/pages/Cart/Cart.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>
            You must <Link to="/">sign in</Link> to view your cart.
          </p>
        </div>
      </div>
    );
  }

  // Helper function to get correct price
  const getPrice = (item) => {
    if (Array.isArray(item.price)) {
      const idx = item.sizes?.indexOf(item.size) ?? 0;
      return item.price[idx] ?? 0;
    } else if (typeof item.price === "number") {
      return item.price;
    } else if (typeof item.price === "string") {
      return parseFloat(item.price.replace("R", "")) || 0;
    }
    return 0;
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * (item.quantity || 1),
    0
  );

  // Checkout handler (example)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);
      // Call your backend checkout endpoint here
      // Example: await axios.post("/checkout", { cartItems, total: totalPrice })
      toast.success("Proceeding to checkout...");
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error("Error during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>🛒 Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <Link to="/products">Shop Now</Link>
          </p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => {
                  const price = getPrice(item);
                  const subtotal = price * item.quantity;

                  return (
                    <tr key={idx}>
                      <td className="cart-product">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-product-img"
                          />
                        )}
                        <span>{item.name}</span>
                      </td>
                      <td>{item.size || "default"}</td>
                      <td>R{price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>R{subtotal.toFixed(2)}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeFromCart(item.productId, item.size)
                          }
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="cart-footer">
              <h3 className="cart-total">Total: R{totalPrice.toFixed(2)}</h3>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
