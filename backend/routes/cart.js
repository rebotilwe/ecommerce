const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user cart
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.query("SELECT * FROM cart WHERE userId = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add or update item
router.post("/add", (req, res) => {
  let { userId, productId, name, size, quantity, price, image } = req.body;
  size = size && size.trim() !== "" ? size : "default";

  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  db.query(
    "SELECT * FROM cart WHERE userId=? AND productId=? AND size=?",
    [userId, productId, size],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
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

// Update quantity route (new)
router.put("/update-quantity", (req, res) => {
  let { userId, productId, size, quantity } = req.body;
  size = size && size.trim() !== "" ? size : "default";

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    "UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ? AND size = ?",
    [quantity, userId, productId, size],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Quantity updated" });
    }
  );
});

// Remove item
router.delete("/remove", (req, res) => {
  const { userId, productId, size } = req.body;
  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  const safeSize = size && size.trim() !== "" ? size : "default";

  db.query(
    "DELETE FROM cart WHERE userId=? AND productId=? AND size=?",
    [userId, productId, safeSize],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item removed from cart" });
    }
  );
});


// Clear cart
router.delete("/clear/:userId", (req, res) => {
  const { userId } = req.params;
  db.query("DELETE FROM cart WHERE userId=?", [userId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cart cleared successfully" });
  });
});

module.exports = router;
