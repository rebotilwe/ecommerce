// src/components/TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="top-bar bg-dark text-white py-1">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left side: phone + email */}
        <div className="d-flex align-items-center">
          <div className="me-3 d-flex align-items-center">
            <FaPhone className="me-1" /> <span>+27 123 456 789</span>
          </div>
          <div className="d-flex align-items-center">
            <FaEnvelope className="me-1" /> <span>info@thirsti.com</span>
          </div>
        </div>

        {/* Right side: social icons + Sign Up/Login */}
        <div className="d-flex align-items-center">
          <a href="https://facebook.com" className="text-white me-3">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="text-white me-3">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="text-white me-3">
            <FaInstagram />
          </a>
          <Link to="/signup" className="text-white me-3">Sign Up</Link>
          <Link to="/login" className="text-white">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
