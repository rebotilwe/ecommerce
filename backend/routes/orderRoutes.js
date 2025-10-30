// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
// const { checkout } = require("../controllers/orderController");
const { checkout, getUserOrders } = require("../controllers/orderController");
router.post("/checkout", checkout);
router.get("/user/:userId", getUserOrders); // 👈 new
module.exports = router;
