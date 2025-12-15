const Member = require("../models/Member");
const User = require("../models/User");

// This is to check if role is Executive or Admin
const isExecutiveOrAdmin = (role) =>
  role === "Executive" || role === "Admin";

// GET MY PROFILE 

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Member.findOne({ userId });

    res.json({
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

// CREATE MEMBER PROFILE

exports.createMember = async (req, res) => {
  try {
    let userId = req.user.userId;

    if (isExecutiveOrAdmin(req.user.role) && req.body.userId) {
      userId = req.body.userId;
    }

    const exists = await Member.findOne({ userId });
    if (exists) return res.status(400).json({ message: "Profile already exists" });

    const member = await Member.create({ userId, ...req.body });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL MEMBERS (Exec/Admin)

exports.getAllMembers = async (req, res) => {
  if (!isExecutiveOrAdmin(req.user.role))
    return res.status(403).json({ message: "Forbidden" });

  const members = await Member.find();
  res.json(members);
};


// GET MEMBER BY ID

exports.getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role === "Member" &&
    req.user.userId !== member.userId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(member);
};


// UPDATE MEMBER

exports.updateMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role === "Member" &&
    req.user.userId !== member.userId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(member, req.body);
  await member.save();
  res.json(member);
};

// DELETE MEMBER

exports.deleteMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role === "Member" &&
    req.user.userId !== member.userId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await member.deleteOne();
  res.json({ message: "Member deleted" });
};

// MEMBER SUMMARY (Executive/Admin)

exports.getMemberSummary = async (req, res) => {
  try {
    if (!isExecutiveOrAdmin(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ status: "Active" });

    // Execs can see Members + Executives (mao ni ilang makita lang base sa ilang role)
    const memberCount = await User.countDocuments({ role: "Member" });
    const execCount = await User.countDocuments({ role: "Executive" });

    const response = {
      members: totalMembers,
      active_members: activeMembers,
      accounts: {
        members: memberCount,
        executives: execCount
      }
    };

    // Admins see everything (opkors)
    if (req.user.role === "Admin") {
      response.accounts.admins = await User.countDocuments({ role: "Admin" });
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
