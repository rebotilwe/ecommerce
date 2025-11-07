const db = require("../db");

// ✅ Get all customers
exports.getCustomers = (req, res) => {
  db.query(
    "SELECT id, name, email, phone, address, created_at FROM users WHERE role = 'customer'",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ✅ Get all orders (with total per order)
// backend/controllers/adminController.js
exports.getOrders = (req, res) => {
  const query = `
    SELECT 
      o.id,
      o.user_id,
      u.name AS customer_name,
      COALESCE(SUM(oi.quantity * oi.price), 0) AS total,
      o.total_amount,
      o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id, o.user_id, u.name, o.total_amount, o.created_at
    ORDER BY o.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("SQL Error fetching orders:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};



// ✅ Get all messages
exports.getMessages = (req, res) => {
  db.query(
    "SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ✅ Get dashboard totals
exports.getTotals = (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) AS total_users FROM users WHERE role = 'customer'",
    orders: "SELECT COUNT(*) AS total_orders FROM orders",
    messages: "SELECT COUNT(*) AS total_messages FROM contacts"
  };

  const totals = {};
  let completed = 0;
  const keys = Object.keys(queries);

  keys.forEach((key) => {
    db.query(queries[key], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      totals[key] = result[0][`total_${key}`];
      completed++;
      if (completed === keys.length) {
        res.json(totals);
      }
    });
  });
};
// Get orders grouped by month
// exports.getMonthlyOrders = (req, res) => {
//   const query = `
//     SELECT 
//       DATE_FORMAT(created_at, '%Y-%m') AS month,
//       COUNT(*) AS orders_count
//     FROM orders
//     GROUP BY month
//     ORDER BY month
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching monthly orders:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// };
// Get all products
exports.getProducts = (req, res) => {
  const query = "SELECT * FROM products ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    results.forEach(p => {
      p.sizes = JSON.parse(p.sizes);
      p.prices = JSON.parse(p.prices);
    });
    res.json(results);
  });
};

// Add new product
// Add new product
exports.addProduct = (req, res) => {
  const { name, category, sizes, prices } = req.body;
  let image = null;

  // Handle uploaded image
  if (req.file) {
    image = "/uploads/" + req.file.filename; // relative path to serve from frontend
  }

  const query = "INSERT INTO products (name, category, image, sizes, prices) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, category, image, JSON.stringify(sizes), JSON.stringify(prices)],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product added successfully", id: result.insertId });
    }
  );
};



// Update product
// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, category, sizes, prices } = req.body;
  let image = null;

  if (req.file) {
    image = "/uploads/" + req.file.filename;
  }

  let query, params;
  if (image) {
    query = "UPDATE products SET name=?, category=?, image=?, sizes=?, prices=? WHERE id=?";
    params = [name, category, image, JSON.stringify(sizes), JSON.stringify(prices), id];
  } else {
    query = "UPDATE products SET name=?, category=?, sizes=?, prices=? WHERE id=?";
    params = [name, category, JSON.stringify(sizes), JSON.stringify(prices), id];
  }

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated successfully" });
  });
};


// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
};
