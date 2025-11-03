const express = require("express");
const router = express.Router();
const { initializePayment } = require("../controllers/paystackController");

router.post("/initialize", initializePayment);

module.exports = router;
