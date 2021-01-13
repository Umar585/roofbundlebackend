const express = require("express");
const mailchimp = require("../../controllers/MailChimp/mailchimp");
router = express.Router();

router.get("/", mailchimp.mailchimp);

module.exports = router;
