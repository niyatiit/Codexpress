const express = require("express");
const router = express.Router();
const { addNewBatch,updateBatch,getBatchById } = require("../controllers/batchController");

router.post("/add", addNewBatch); // Add a new batch
router.get("/:id", getBatchById); // Add a new batch
router.put("/update/:id", updateBatch); // Add a new batch

module.exports = router;
