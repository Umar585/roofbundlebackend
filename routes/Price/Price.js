const express = require("express");
const router = express.Router();
const { getPrice, updatePrice } = require("../../controllers/Price/Price");

router.post("/", getPrice);
router.post("/priceupdate", updatePrice);

module.exports = router;
