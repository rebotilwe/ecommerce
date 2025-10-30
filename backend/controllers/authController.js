// backend/controllers/authController.js
const db = require("../db");
const bcrypt = require("bcrypt");

// SIGN UP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: err.message });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "All fields are required" });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length === 0) return res.status(400).json({ message: "User not found" });

      const user = results[0];

      // Compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "Incorrect password" });

      res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
    }
  );
};
