const User = require("../models/User");
const Member = require("../models/Member");

// GET ALL USERS (Admin)

const getAllUsers = async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const users = await User.find().select("-passwordHash");
  res.json(users);
};

// ADMIN SYSTEM SUMMARY (mao ni ang GET /api/users/summary)

const getUserSummary = async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const admins = await User.countDocuments({ role: "Admin" });
  const executives = await User.countDocuments({ role: "Executive" });
  const members = await User.countDocuments({ role: "Member" });

  const totalProfiles = await Member.countDocuments();

  res.json({
    accounts: {
      admins,
      executives,
      members
    },
    total_member_profiles: totalProfiles
  });
};

// CHANGE ROLE (admin will do this and applicable sa tanang users guys ha)

const changeUserRole = async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const { role } = req.body;
  if (!["Member", "Executive", "Admin"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-passwordHash");

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "Role updated", user });
};

// DELETE USER

const deleteUser = async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const userId = req.params.id;
  await Member.findOneAndDelete({ userId });
  await User.findByIdAndDelete(userId);

  res.json({ message: "User and profile deleted" });
};

module.exports = {
  getAllUsers,
  getUserSummary,
  changeUserRole,
  deleteUser
};
