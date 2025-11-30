const User = require("../models/User");

// Admin only: change a user's role
const changeUserRole = async (req, res) => {
  try {
    // Only Admin allowed (middleware should check, but double-check here)
    if (req.user.role !== "Admin") return res.status(403).json({ message: "Forbidden" });

    const userId = req.params.id;
    const { role } = req.body;
    if (!["Member", "Executive", "Admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Role updated", user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { changeUserRole };
