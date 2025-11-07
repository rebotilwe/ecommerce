const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getCustomers,
  getOrders,
  getMessages,
  getTotals,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/adminController");

// ----- Multer setup for product images -----
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});
const upload = multer({ storage });

// ✅ Customers
router.get("/customers", getCustomers);

// ✅ Orders
router.get("/orders", getOrders);

// ✅ Messages
router.get("/messages", getMessages);

// ✅ Dashboard totals
router.get("/totals", getTotals);

// ✅ Product Management
router.get("/products", getProducts);
router.post("/products", upload.single("image"), addProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
