const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["Member", "Executive", "Admin"],
    default: "Member"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
