const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

/* =======================
   CORS CONFIG (FIXED)
   ======================= */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fintracker-frontend-nine.vercel.app" // 🔴 replace if your Vercel URL is different
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* =======================
   MIDDLEWARE
   ======================= */
app.use(express.json());

/* =======================
   ROUTES
   ======================= */
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

/* =======================
   DATABASE CONNECTION
   ======================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI environment variable is not set");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
