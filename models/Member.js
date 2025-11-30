const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }, // typically same as user's email
  department: String,
  year_level: String,
  position: String,
  status: { type: String, enum: ["Active", "Inactive", "Graduated"], default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("Member", MemberSchema);
