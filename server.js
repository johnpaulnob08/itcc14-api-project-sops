// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Authentication routes (signup, login, /me)
app.use("/api/auth", authRoutes);

// Member profile routes (CRUD, /me)
app.use("/api/members", memberRoutes);

// User management routes (Admin only)
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => res.send("SOPS API is running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
