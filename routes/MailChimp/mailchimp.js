const express = require("express");
const mailchimp = require("../../controllers/MailChimp/mailchimp");
router = express.Router();
//mailchimp = require("../../controllers/MailChimp/mailchimp");

router.get("/", mailchimp.mailchimp);

module.exports = router;
