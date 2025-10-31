const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({ storage });

// Update user profile
router.put("/update/:id", upload.single("profileImage"), (req, res) => {
  const userId = req.params.id;
  const { name, phone, address } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  if (!name || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let query, params;
  if (profileImage) {
    query = "UPDATE users SET name = ?, phone = ?, address = ?, profile_image = ? WHERE id = ?";
    params = [name, phone, address, profileImage, userId];
  } else {
    query = "UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?";
    params = [name, phone, address, userId];
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Return updated user with **profile_image** key
    const updatedUser = {
      id: userId,
      name,
      phone,
      address,
      profile_image: profileImage || undefined, // match database field
    };

    res.json({ success: true, user: updatedUser });
  });
});

module.exports = router;
