const express = require("express");
const router = express.Router();
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const {
  register,
  login,
  getAllUsers
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticate, isAdmin, getAllUsers);

module.exports = router;
