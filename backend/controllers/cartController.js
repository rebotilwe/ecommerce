const db = require("../db");

// Add to cart
exports.addToCart = (req, res) => {
  let { userId, productId, size, quantity } = req.body;
  if (!size || size.trim() === "") size = "default";

  console.log("🛒 Add to Cart called with:", req.body);

  const checkQuery =
    "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ?";
  db.query(checkQuery, [userId, productId, size], (err, results) => {
    if (err) {
      console.error("❌ MySQL SELECT error:", err);
      return res.status(500).json({ message: err.message });
    }

    if (results.length > 0) {
      const updateQuery =
        "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?";
      db.query(updateQuery, [quantity, results[0].id], (err2) => {
        if (err2) {
          console.error("❌ MySQL UPDATE error:", err2);
          return res.status(500).json({ message: err2.message });
        }
        console.log("✅ Cart updated successfully");
        res.json({ message: "Cart updated successfully" });
      });
    } else {
      const insertQuery =
        "INSERT INTO cart_items (user_id, product_id, size, quantity) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [userId, productId, size, quantity], (err3) => {
        if (err3) {
          console.error("❌ MySQL INSERT error:", err3);
          return res.status(500).json({ message: err3.message });
        }
        console.log("✅ Item added to cart successfully");
        res.json({ message: "Item added to cart" });
      });
    }
  });
};

// Get user’s cart
exports.getCart = (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM cart_items WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Remove item from cart by productId + size
exports.removeFromCart = (req, res) => {
  const { userId, productId, size } = req.body;
  const safeSize = size && size.trim() !== "" ? size : "default";

  const sql =
    "DELETE FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ?";
  db.query(sql, [userId, productId, safeSize], (err, results) => {
    if (err) {
      console.error("❌ MySQL DELETE error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log(`✅ Removed product ${productId} size ${safeSize} from user ${userId}'s cart`);
    res.json({ message: "Item removed" });
  });
};
