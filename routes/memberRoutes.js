// routes/memberRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const memberCtrl = require("../controllers/memberController");

// ===============================
// ⭐ MUST BE ABOVE ANY /:id ROUTES
// ===============================

// Get logged-in user's merged profile
router.get("/me", auth, memberCtrl.getMyProfile);

// Update own member profile
router.patch("/me/update-profile", auth, memberCtrl.updateMyProfile);

// Delete own account + member profile
router.delete("/me/delete", auth, memberCtrl.deleteMyAccount);

// Get organization summary (Exec/Admin only)
router.get("/me/summary", auth, memberCtrl.getSummary);

// ===============================
// EXISTING ROUTES (no changes)
// ===============================

// Create a new member profile
router.post("/", auth, memberCtrl.createMember);

// Get ALL members (Exec/Admin only)
router.get("/", auth, memberCtrl.getAllMembers);

// Get member by ID
router.get("/:id", auth, memberCtrl.getMemberById);

// Update member by ID (PUT or PATCH)
router.put("/:id", auth, memberCtrl.updateMember);
router.patch("/:id", auth, memberCtrl.updateMember);

// Delete member by ID
router.delete("/:id", auth, memberCtrl.deleteMember);

module.exports = router;
