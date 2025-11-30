// controllers/memberController.js
const Member = require("../models/Member");
const User = require("../models/User");

// Helpers
const isExecutiveOrAdmin = (role) => role === "Executive" || role === "Admin";

// ===============================================================
// ⭐ 1. MERGED /me — User + Profile
// ===============================================================
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get member profile
    const profile = await Member.findOne({ userId });

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      profile: profile || null
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// ⭐ 2. CREATE MEMBER PROFILE
// ===============================================================
exports.createMember = async (req, res) => {
  try {
    const userRole = req.user.role;
    let userId = req.user.userId;

    const { firstname, lastname, email, department, year_level, position, status } = req.body;

    // Exec/Admin can specify userId
    if (isExecutiveOrAdmin(userRole) && req.body.userId) {
      userId = req.body.userId;
    }

    const exists = await Member.findOne({ userId });
    if (exists) return res.status(400).json({ message: "Profile already exists" });

    const member = await Member.create({
      userId,
      firstname,
      lastname,
      email,
      department,
      year_level,
      position,
      status
    });

    res.status(201).json(member);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ===============================================================
// ⭐ 3. GET ALL MEMBERS (Exec/Admin only)
// ===============================================================
exports.getAllMembers = async (req, res) => {
  if (!isExecutiveOrAdmin(req.user.role))
    return res.status(403).json({ message: "Forbidden" });

  const members = await Member.find();
  res.json(members);
};

// ===============================================================
// ⭐ 4. GET MEMBER BY ID (Owner or Exec/Admin)
// ===============================================================
exports.getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (req.user.role === "Member" && req.user.userId !== member.userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(member);
};

// ===============================================================
// ⭐ 5. UPDATE MEMBER
// ===============================================================
exports.updateMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (req.user.role === "Member" && req.user.userId !== member.userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(member, req.body);
  await member.save();
  res.json(member);
};

// ===============================================================
// ⭐ 6. DELETE MEMBER
// ===============================================================
exports.deleteMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (req.user.role === "Member" && req.user.userId !== member.userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await member.deleteOne();
  res.json({ message: "Member deleted" });
};

// ===============================================================
// ⭐ 7. UPDATE OWN PROFILE (/me/update-profile)
// ===============================================================
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    let profile = await Member.findOne({ userId });
    if (!profile) return res.status(404).json({ message: "Profile does not exist" });

    Object.assign(profile, req.body);
    await profile.save();

    res.json({
      message: "Profile updated",
      profile
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// ⭐ 8. DELETE OWN ACCOUNT + PROFILE (/me/delete)
// ===============================================================
exports.deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Member.deleteOne({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account and profile deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================================================
// ⭐ 9. ORG SUMMARY (Exec/Admin only)
// ===============================================================
exports.getSummary = async (req, res) => {
  try {
    if (!isExecutiveOrAdmin(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    const total = await Member.countDocuments();
    const active = await Member.countDocuments({ status: "Active" });
    const inactive = await Member.countDocuments({ status: "Inactive" });

    const admin = await User.countDocuments({ role: "Admin" });
    const executives = await User.countDocuments({ role: "Executive" });
    const members = await User.countDocuments({ role: "Member" });

    res.json({
      total_members: total,
      active_members: active,
      inactive_members: inactive,
      total_accounts: {
        admins: admin,
        executives: executives,
        members: members
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
