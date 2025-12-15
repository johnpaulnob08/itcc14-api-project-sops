const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const memberCtrl = require("../controllers/memberController");

// SELF

// Get logged-in user's merged profile (user ug member nila)
router.get("/me", auth, memberCtrl.getMyProfile);

// SUMMARY

// Org summary (Executive/Admin) basta mao ning /api/members/summary
router.get("/summary", auth, memberCtrl.getMemberSummary);

// MEMBERS

// Create a new member profile
router.post("/", auth, memberCtrl.createMember);

// Get ALL members (Exec/Admin only)
router.get("/", auth, memberCtrl.getAllMembers);

// Get member by ID
router.get("/:id", auth, memberCtrl.getMemberById);

// Update member by ID (owner or Exec/Admin)
router.put("/:id", auth, memberCtrl.updateMember);
router.patch("/:id", auth, memberCtrl.updateMember);

// Delete member by ID (owner or Exec/Admin)
router.delete("/:id", auth, memberCtrl.deleteMember);

module.exports = router;
