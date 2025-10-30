// src/components/Auth/LoginSignUpPopup.jsx
import React, { useState } from "react";
import "./LoginSignUpPopup.css";
import crossIcon from "../../assets/images/cross_icon.png";

const LoginSignUpPopup = ({ show, onClose, setUser }) => {
  const [mode, setMode] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [agreeTerms, setAgreeTerms] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "Sign Up" && !agreeTerms) {
      alert("You must agree to the terms and privacy policy.");
      return;
    }

    const url = mode === "Login"
      ? "http://localhost:8085/login"
      : "http://localhost:8085/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // Set the logged-in user in the parent (Navbar)
      if (mode === "Login") {
        setUser(data.user); // user = {id, name, email}
        alert(`Welcome back, ${data.user.name}!`);
      } else {
        alert("Sign Up successful! You can now log in.");
        setMode("Login");
      }

      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-popup-backdrop">
      <div className="auth-popup">
        <div className="auth-header">
          <h2>{mode}</h2>
          <img
            src={crossIcon}
            alt="Close"
            onClick={onClose}
            className="close-icon"
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {mode === "Sign Up" && (
            <label className="terms">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              I agree to the Terms of Use and Privacy Policy
            </label>
          )}

          <button type="submit" className="btn btn-primary">
            {mode === "Login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setMode("Sign Up")}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setMode("Login")}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPopup;
