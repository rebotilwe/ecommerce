const express = require("express");
const router = express.Router();
const db = require("../db"); // Your MySQL connection

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const query = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("❌ Error saving contact:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Message sent successfully!" });
  });
});

module.exports = router;
