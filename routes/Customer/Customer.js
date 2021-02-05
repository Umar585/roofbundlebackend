const express = require("express");
const router = express.Router();
const { AddUser, GetUsers } = require("../../controllers/Customer/Customer");

router.post("/adduser", AddUser);
router.post("/getusers", GetUsers);

module.exports = router;
