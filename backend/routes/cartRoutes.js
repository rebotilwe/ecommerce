const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// Add item
router.post("/add", addToCart);

// Get user cart
router.get("/:userId", getCart);

// Remove a single item
router.delete("/remove", removeFromCart);

// Clear all cart items
router.delete("/clear/:userId", clearCart);

module.exports = router;
