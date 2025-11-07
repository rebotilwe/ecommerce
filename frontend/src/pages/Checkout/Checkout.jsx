// src/pages/Checkout/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    isDelivery: false,
    firstName: "",
    lastName: "",
    email: user.email || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  if (!user) {
    toast.error("You must log in to checkout!");
    navigate("/login");
    return null;
  }

  const handleDeliveryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPrice(item) * (item.quantity || 1),
    0
  );

  const deliveryFee = deliveryInfo.isDelivery && subtotal > 0 ? 50 : 0;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "thirsti10") {
      setDiscount(subtotal * 0.1);
      toast.success("Promo code applied! 10% discount");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  };

  const totalZAR = subtotal + deliveryFee - discount;
  const amountCents = totalZAR * 100;

  const handleCheckout = () => {
    // Validate delivery info if delivery is selected
    if (deliveryInfo.isDelivery) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "street",
        "city",
        "state",
        "zipCode",
        "country",
        "phone",
      ];
      for (let field of requiredFields) {
        if (!deliveryInfo[field]?.trim()) {
          toast.error(`Please fill in your ${field}`);
          return;
        }
      }
    }

    if (!window.PaystackPop) {
      toast.error("Payment system not loaded. Try again later.");
      return;
    }

    const paymentEmail = deliveryInfo.email || user.email;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: paymentEmail,
      amount: amountCents,
      currency: "ZAR",
      callback: function () {
        setPaymentSuccess(true);
        clearCart();

        // Start fade-out animation before navigating
        setTimeout(() => setFadeOut(true), 1000);
        setTimeout(() => navigate("/"), 1500);
      },
      onClose: function () {
        toast.error("Payment was closed");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="checkout-page">
      {/* Payment success modal */}
      {paymentSuccess && (
        <div
          className={`payment-success-modal ${fadeOut ? "fade-out" : ""}`}
        >
          <div className="modal-content">
            <h2>Payment Successful!</h2>
            <p>Redirecting to Home...</p>
          </div>
        </div>
      )}

      <div className="place-order">
        {/* Left: Delivery Info */}
        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <label>
            <input
              type="checkbox"
              name="isDelivery"
              checked={deliveryInfo.isDelivery}
              onChange={handleDeliveryChange}
            />{" "}
            Deliver to my address
          </label>

          {deliveryInfo.isDelivery && (
            <div className="multi-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={deliveryInfo.firstName}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={deliveryInfo.lastName}
                onChange={handleDeliveryChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={deliveryInfo.email}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={deliveryInfo.street}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={deliveryInfo.state}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={deliveryInfo.zipCode}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={deliveryInfo.country}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={deliveryInfo.phone}
                onChange={handleDeliveryChange}
              />
            </div>
          )}
        </div>

        {/* Right: Checkout Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>
                {item.name} ({item.size || "default"}) x {item.quantity} - R
                {(getPrice(item) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <div className="promo-section">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={applyPromo}>
              Apply
            </button>
          </div>

          <div className="totals">
            <p>Subtotal: R{subtotal.toFixed(2)}</p>
            <p>Delivery Fee: R{deliveryFee.toFixed(2)}</p>
            {discount > 0 && <p>Discount: -R{discount.toFixed(2)}</p>}
            <h3>Total: R{totalZAR.toFixed(2)}</h3>
          </div>

          <button className="btn btn-primary" onClick={handleCheckout}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
