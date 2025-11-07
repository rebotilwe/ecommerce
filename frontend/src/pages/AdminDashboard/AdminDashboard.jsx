import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaEnvelope } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardGraph = ({ totals }) => {
  const data = {
    labels: ["Users", "Products", "Orders", "Messages"],
    datasets: [
      {
        label: "Totals",
        data: [totals.users, 320, totals.orders, totals.messages],
        backgroundColor: "rgba(99, 102, 241, 0.8)", // indigo color
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Dashboard Overview Totals" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          color: "#374151",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: "#374151",
          font: { weight: "600" },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ users: 0, orders: 0, messages: 0 });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/admin/totals");
        if (!res.ok) throw new Error("Failed to fetch totals");
        const data = await res.json();
        setTotals(data);
      } catch (err) {
        console.error("Error fetching totals:", err);
      }
    };

    fetchTotals();
  }, []);

  return (
    <>
      <header className="admin-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin 👋</p>
      </header>

      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate("/dashboard/users")}>
          <FaUsers className="icon" />
          <h3>{totals.users}</h3>
          <p>Total Users</p>
        </div>
        <div className="admin-card" onClick={() => navigate("/dashboard/products")}>
          <FaBoxOpen className="icon" />
          <h3>320</h3>
          <p>Products Listed</p>
        </div>
        <div className="admin-card" onClick={() => navigate("/dashboard/orders")}>
          <FaShoppingCart className="icon" />
          <h3>{totals.orders}</h3>
          <p>Orders Completed</p>
        </div>
        <div className="admin-card" onClick={() => navigate("/dashboard/messages")}>
          <FaEnvelope className="icon" />
          <h3>{totals.messages}</h3>
          <p>New Messages</p>
        </div>
      </div>

      <section className="admin-graph">
        <h2>Overview Chart</h2>
        <DashboardGraph totals={totals} />
      </section>

      <section className="admin-section">
        <h2>Recent Activities</h2>
        <p>Recent user logins, new orders, and updates will appear here.</p>
      </section>
    </>
  );
};

export default AdminDashboard;
