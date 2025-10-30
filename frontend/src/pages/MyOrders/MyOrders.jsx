import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8085/orders/user/${user.id}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user)
    return (
      <div className="my-orders">
        <div className="container">
          <h2>My Orders</h2>
          <p>Please sign in to view your orders.</p>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="my-orders">
        <div className="container">
          <h2>Loading orders...</h2>
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="my-orders">
        <div className="container">
          <h2>My Orders</h2>
          <p>You haven’t placed any orders yet.</p>
        </div>
      </div>
    );

  return (
    <div className="my-orders">
      <div className="container">
        <h2>My Orders</h2>
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <h4>Order #{order.orderId}</h4>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()} <br />
                <strong>Total:</strong> R{order.total}
              </p>
            </div>
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product_id}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>R{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
