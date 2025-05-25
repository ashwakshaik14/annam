const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // ✅ New email field
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }
},
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
