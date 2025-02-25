const express = require("express");
const router = express.Router();
const { userVerification } = require("../middleware/userVerification");
const { roleAuthorization } = require("../middleware/roleAuthorization");
const adminController = require("../controllers/adminController");

// Example route that requires admin role
router.post("/admin-dashboard", userVerification, roleAuthorization("admin"), adminController);

module.exports = router;
