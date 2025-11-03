// controllers/paystackController.js
const fetch = require("node-fetch"); // ✅ make sure node-fetch v2 is installed
require("dotenv").config();

// Initialize Paystack payment
exports.initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ error: "Missing email or amount" });
    }

    // Paystack API request
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email,
        amount,
        currency: "ZAR",
        callback_url: "http://localhost:3000/payment-success", // redirect after payment
      }),
    });

    const data = await response.json();
    console.log("Paystack response:", data); // logs for debugging

    if (data.status && data.data.authorization_url) {
      res.json({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      });
    } else {
      res.status(400).json({ error: "Unable to initialize Paystack transaction", data });
    }
  } catch (err) {
    console.error("❌ Paystack server error:", err);
    res.status(500).json({ error: "Server error initializing Paystack" });
  }
};
