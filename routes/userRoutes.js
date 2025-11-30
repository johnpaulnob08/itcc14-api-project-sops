const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { changeUserRole } = require("../controllers/userController");

// Admin only route to change user's role
router.patch("/:id/role", auth, changeUserRole);

module.exports = router;
