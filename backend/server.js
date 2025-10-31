// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contact");
const profileRoutes = require("./routes/profile");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware to serve static uploads
app.use("/uploads", express.static("uploads"));

app.use("/", authRoutes);
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", profileRoutes);
const PORT = 8085;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
