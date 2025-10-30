// backend/controllers/orderController.js
const db = require("../db");

// Handle checkout (place order)
exports.checkout = (req, res) => {
  const { userId, totalAmount, cartItems } = req.body;

  if (!userId || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Invalid checkout data" });
  }

  // Insert order
  const orderQuery =
    "INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, NOW())";
  db.query(orderQuery, [userId, totalAmount], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    const orderId = result.insertId;

    // Insert order items
    const orderItems = cartItems.map((item) => [
      orderId,
      item.product_id || item.id,
      item.size,
      item.quantity,
      item.price,
    ]);

    const itemQuery =
      "INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES ?";
    db.query(itemQuery, [orderItems], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });

      // Clear cart after successful checkout
      const clearCartQuery = "DELETE FROM cart_items WHERE user_id = ?";
      db.query(clearCartQuery, [userId], (err3) => {
        if (err3) return res.status(500).json({ message: err3.message });
        res.json({ message: "Order placed successfully", orderId });
      });
    });
  });
};
// Get all orders for a user
exports.getUserOrders = (req, res) => {
  const { userId } = req.params;

  const ordersQuery = `
    SELECT o.id AS order_id, o.total_amount, o.created_at,
           oi.product_id, oi.size, oi.quantity, oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(ordersQuery, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    // Group by order_id
    const grouped = {};
    results.forEach((row) => {
      if (!grouped[row.order_id]) {
        grouped[row.order_id] = {
          orderId: row.order_id,
          total: row.total_amount,
          date: row.created_at,
          items: [],
        };
      }
      grouped[row.order_id].items.push({
        product_id: row.product_id,
        size: row.size,
        quantity: row.quantity,
        price: row.price,
      });
    });

    res.json(Object.values(grouped));
  });
};
