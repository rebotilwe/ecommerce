const db = require("../db");

// ✅ Get user cart
exports.getCart = (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM cart_items WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ✅ Add or update item
exports.addToCart = (req, res) => {
  const { userId, productId, size, quantity, price } = req.body;

  if (!userId || !productId || price === undefined)
    return res.status(400).json({ message: "Missing fields" });

  const safeSize = size && size.trim() !== "" ? size : "default";

  db.query(
    "SELECT * FROM cart_items WHERE user_id=? AND product_id=? AND size=?",
    [userId, productId, safeSize],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        const newQty = results[0].quantity + quantity;
        db.query(
          "UPDATE cart_items SET quantity=?, price=? WHERE id=?",
          [newQty, price, results[0].id],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ message: "Cart updated successfully" });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart_items (user_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)",
          [userId, productId, safeSize, quantity, price],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ message: "Item added to cart successfully" });
          }
        );
      }
    }
  );
};
exports.updateQuantity = (req, res) => {
  const { userId, productId, size, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const safeSize = size && size.trim() !== "" ? size : "default";
  db.query(
    "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ? AND size = ?",
    [quantity, userId, productId, safeSize],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Quantity updated" });
    }
  );
};


// ✅ Remove item
exports.removeFromCart = (req, res) => {
  const { userId, productId, size } = req.body;

  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  const safeSize = size && size.trim() !== "" ? size : "default";

  db.query(
    "DELETE FROM cart_items WHERE user_id=? AND product_id=? AND size=?",
    [userId, productId, safeSize],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item removed from cart" });
    }
  );
};

// ✅ Clear cart
exports.clearCart = (req, res) => {
  const { userId } = req.params;
  db.query("DELETE FROM cart_items WHERE user_id=?", [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cart cleared successfully" });
  });
};
