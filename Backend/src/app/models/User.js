const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    yearOfAdmission: { type: Number, required: false },
    role: { type: String, enum: ["student", "lecturer"], required: true, default: "student" },
    avatar: { type: String }, // URL ảnh đại diện
    status: { type: String, enum: ['active', 'locked', 'non-active'], default: 'non-active' },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

// Định nghĩa method comparePassword
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
