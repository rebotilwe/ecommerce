// src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import LoginSignUpPopup from "../Auth/LoginSignUpPopup.jsx";

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const { user, login, logout } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* 🌟 Topbar */}
      <div className="topbar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="topbar-left">
            <span>
              <FaPhoneAlt /> +27 12 345 6789
            </span>
            <span>
              <FaEnvelope /> info@thirsti.co.za
            </span>
          </div>
          <div className="topbar-right">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>

            {user ? (
              <>
                <span>Welcome, {user.name || "User"}!</span>
                <button className="auth-btn ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="auth-btn" onClick={() => setShowAuth(true)}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🌟 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand logo-text" to="/">
            THIRSTI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>

              {/* ✅ Show Cart only if logged in */}
              {user && (
                <li className="nav-item">
                  <Link className="nav-link cart-icon" to="/cart">
                    <FaShoppingCart />
                    <span className="cart-badge">{totalItems}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* 🌟 Login / Sign Up Popup */}
      {showAuth && (
        <LoginSignUpPopup
          show={showAuth}
          onClose={() => setShowAuth(false)}
          setUser={login}
        />
      )}
    </>
  );
};

export default Navbar;
