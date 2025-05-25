const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
    const { username, email, password, role, passnumber } = req.body;
  
    console.log("📥 Incoming registration:", { username, email, role });
  
    try {
      // Admin role validation
      if (role === "admin") {
        if (passnumber !== process.env.ADMIN_PASSNUMBER) {
          return res.status(403).json({ error: "Invalid admin passnumber" });
        }
      }
  
      // Check existing user
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: "Username or email already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();
  
      console.log("✅ Registered user:", user);
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("❌ Registration error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", 
      token ,
      username: user.username,  // ✅ include username
      role: user.role 
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
