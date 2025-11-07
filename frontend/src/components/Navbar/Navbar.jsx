// src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Image, Button } from "react-bootstrap";
import { FaShoppingCart, FaUserCircle, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { CartContext } from "../../context/CartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import LoginSignUpPopup from "../Auth/LoginSignUpPopup.jsx";
import "./Navbar.css";

const AppNavbar = () => {
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
      <div className="topbar d-none d-lg-flex">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="topbar-left d-flex gap-3">
            <span><FaPhoneAlt /> +27 12 345 6789</span>
            <span><FaEnvelope /> info@thirsti.co.za</span>
          </div>
          <div className="topbar-right d-flex gap-3 align-items-center">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            {user ? (
              <>
                <span>Welcome, {user.name || "User"}!</span>
                <Button className="auth-btn" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button className="auth-btn" onClick={() => setShowAuth(true)}>Sign In</Button>
            )}
          </div>
        </Container>
      </div>

      {/* 🌟 Navbar */}
      <Navbar expand="lg" bg="light" variant="light" sticky="top" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo-text">THIRSTI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

              {/* Dashboard link only visible for admins */}
              {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              )}

              {user && (
                <>
                  <Nav.Link as={Link} to="/cart" className="position-relative">
                    <FaShoppingCart size={20} />
                    {totalItems > 0 && <Badge pill bg="primary" className="cart-badge">{totalItems}</Badge>}
                  </Nav.Link>

                  <Nav.Link as={Link} to="/profile">
                    {user.profile_image ? (
                      <Image
                        src={`http://localhost:5000/uploads/${user.profile_image}`}
                        roundedCircle
                        width={30}
                        height={30}
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🌟 Login / Sign Up Popup */}
      {showAuth && (
        <LoginSignUpPopup show={showAuth} onClose={() => setShowAuth(false)} setUser={login} />
      )}
    </>
  );
};

export default AppNavbar;
