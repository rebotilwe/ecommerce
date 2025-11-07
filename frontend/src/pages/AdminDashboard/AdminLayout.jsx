import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaEnvelope,
  FaSignOutAlt,
  FaChartPie
} from "react-icons/fa";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo" onClick={() => navigate("/dashboard")}>
          Admin Panel
        </h2>
        <nav className="admin-nav">
          <ul>
            <li onClick={() => navigate("/dashboard")}>
              <FaChartPie /> Dashboard Overview
            </li>
            <li onClick={() => navigate("/dashboard/users")}>
              <FaUsers /> Users
            </li>
            <li onClick={() => navigate("/dashboard/products")}>
              <FaBoxOpen /> Products
            </li>
            <li onClick={() => navigate("/dashboard/orders")}>
              <FaShoppingCart /> Orders
            </li>
            <li onClick={() => navigate("/dashboard/messages")}>
              <FaEnvelope /> Messages
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
