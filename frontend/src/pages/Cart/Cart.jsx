// src/pages/Cart/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Cart.css";

const Cart = () => {
const { cartItems, addToCart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

const increaseQuantity = (item) => {
  updateQuantity(item.productId, item.size, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    updateQuantity(item.productId, item.size, item.quantity - 1);
  } else {
    // If quantity is 1, remove item completely
    removeFromCart(item.productId, item.size);
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
                 <tr key={item.productId + "-" + item.size}>

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
                      <td>
                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(item)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item)}>+</button>
                        </div>
                      </td>
                      <td>R{subtotal.toFixed(2)}</td>
                      <td>
<button className="remove-btn" onClick={() => removeFromCart(item.productId, item.size)}>


  ✖
</button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="cart-footer">
              <h3 className="cart-total">Total: R{totalAmount.toFixed(2)}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
