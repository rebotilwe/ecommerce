const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

// Routes
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/remove", removeFromCart);

module.exports = router;
