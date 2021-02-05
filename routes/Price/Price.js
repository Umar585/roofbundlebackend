const express = require("express");
const router = express.Router();
const { getPrice, updatePrice } = require("../../controllers/Price/Price");

router.get("/", getPrice);
router.post("/", updatePrice);

module.exports = router;
