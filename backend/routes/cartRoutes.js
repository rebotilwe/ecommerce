const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity, // fixed invalid 'update-quantity'
} = require("../controllers/cartController");

// Add item or update quantity
router.post("/add", addToCart);

// Get user cart
router.get("/:userId", getCart);

// Update item quantity
router.put("/update-quantity", updateQuantity);

// Remove a single item
router.delete("/remove", removeFromCart);

// Clear all cart items for user
router.delete("/clear/:userId", clearCart);

module.exports = router;
