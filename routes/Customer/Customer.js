const express = require("express");
const router = express.Router();
const {
  AddUser,
  AddNewUser,
  GetUsers,
  GetSingleUsers,
  UpdateUser,
  DeleteUser,
} = require("../../controllers/Customer/Customer");

router.post("/adduser", AddUser);
router.post("/changeuser", AddNewUser);
router.post("/getusers", GetUsers);
router.post("/getsingleuser", GetSingleUsers);
router.post("/updateuser", UpdateUser);
router.post("/deleteuser", DeleteUser);

module.exports = router;
