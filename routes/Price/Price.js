const express = require("express");
const Prices = require("../../controllers/Price/getPrice");
const UpdatePrices = require("../../controllers/Price/updatePrice");
router = express.Router();

router.get("/", Prices.getPrice);

router.post("/", UpdatePrices.updatePrice);

module.exports = router;
