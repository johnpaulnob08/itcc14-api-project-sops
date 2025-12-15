const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllUsers,
  changeUserRole,
  deleteUser,
  getUserSummary
} = require("../controllers/userController");

// Admin only
router.get("/", auth, getAllUsers);

// Admin summary
router.get("/summary", auth, getUserSummary);

// Change role
router.patch("/:id/role", auth, changeUserRole);

// Delete user
router.delete("/:id", auth, deleteUser);

module.exports = router;
