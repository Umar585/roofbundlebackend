const express = require("express");
const router = express.Router();
const {
  signup,
  verifyemail,
  signin,
  forgotpassword,
  resetpassword,
} = require("../controllers/Auth/Auth");

//routes
router.post("/signup", signup);
router.put("/verifyemail/:emailToken", verifyemail);
router.post("/signin", signin);
router.post("/forgotpassword", forgotpassword);
router.put("/resetpassword/:resetToken", resetpassword);

module.exports = router;
