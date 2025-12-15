const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { signup, login, deleteUser, getMe } = require("../controllers/authController");

// User signup
router.post("/signup", signup);

// User login
router.post("/login", login);

// Get logged-in user's account + profile
router.get("/me", auth, getMe);

// Admin: Delete user + profile
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
