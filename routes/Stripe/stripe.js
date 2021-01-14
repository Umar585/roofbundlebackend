const express = require("express");
const stripe = require("../../controllers/Stripe/stripe");
router = express.Router();

router.post("/", stripe.stripe);

module.exports = router;
