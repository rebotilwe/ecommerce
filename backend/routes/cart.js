const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection

// ✅ Get user cart
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.query("SELECT * FROM cart WHERE userId = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Add or update item
router.post("/add", (req, res) => {
  const { userId, productId, name, size, quantity, price, image } = req.body;

  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  db.query(
    "SELECT * FROM cart WHERE userId=? AND productId=? AND size=?",
    [userId, productId, size],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        // Update quantity
        const newQty = results[0].quantity + quantity;
        db.query(
          "UPDATE cart SET quantity=? WHERE id=?",
          [newQty, results[0].id],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ message: "Cart updated successfully" });
          }
        );
      } else {
        // Insert new item
        db.query(
          "INSERT INTO cart (userId, productId, productName, size, quantity, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [userId, productId, name, size, quantity, price, image],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ message: "Item added to cart successfully" });
          }
        );
      }
    }
  );
});

// ✅ Remove a single item (frontend sends in body)
router.delete("/remove", (req, res) => {
  const { userId, productId, size } = req.body;
  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  db.query(
    "DELETE FROM cart WHERE userId=? AND productId=? AND size=?",
    [userId, productId, size],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item removed from cart" });
    }
  );
});

// ✅ Clear all cart items for a user
router.delete("/clear/:userId", (req, res) => {
  const { userId } = req.params;
  db.query("DELETE FROM cart WHERE userId=?", [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cart cleared successfully" });
  });
});

module.exports = router;
