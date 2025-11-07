// src/components/TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        {/* Left side: phone + email */}
        <div className="left-items">
          <div className="phone-email">
            <FaPhone /> <span className="text">+27 123 456 789</span>
          </div>
          <div className="phone-email">
            <FaEnvelope /> <span className="text">info@thirsti.com</span>
          </div>
        </div>

        {/* Right side: social icons + Sign Up/Login */}
        <div className="right-items">
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
          <Link to="/signup" className="auth-link">Sign Up</Link>
          <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
