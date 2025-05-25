const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ New auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/quizzes", quizRoutes);     // You can prefix routes with /api if preferred
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);        // 🔐 Auth endpoints (register/login)

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
