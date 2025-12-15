const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Member = require("../models/Member");

// USER SIGNUP HERE NA PART

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // There should be no role field here kay si admin mag assign ug role

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    // Here, automatically assign "Member" role to new signups
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "Member"
    });

    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// USER LOGIN NA DIRI NA PART

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


// /auth/me — ACCOUNT + PROFILE - Diri na part makita imong own account details (as member, executive, admin)

const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-passwordHash");
    if (!user)
      return res.status(404).json({ message: "User not found" });

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
    return res.status(500).json({ message: err.message });
  }
};


// ADMIN DELETE USER + PROFILE HERE NA PART kay hellloooo, admin has all the power

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete linked member profile (if exists kay it may have been deleted na by the user)
    await Member.findOneAndDelete({ userId });

    return res.json({ message: "User and member profile deleted" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  getMe,
  deleteUser
};
