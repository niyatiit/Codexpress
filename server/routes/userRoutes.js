const express = require("express");
const router = express.Router();

router.get("/user/:id",getUser)
module.exports = router;
