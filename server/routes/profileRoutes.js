const express = require("express");
const router = express.Router();
const {getUserProfile,updateUserProfile} = require("../controllers/profileController");
const { roleAuthorization ,authenticate} = require("../middleware/authMiddleware"); // Assuming you have authentication middleware

// GET user profile
router.get("/:userId",authenticate, getUserProfile);

// UPDATE user profile
router.put("/update", authenticate, updateUserProfile);

module.exports = router;