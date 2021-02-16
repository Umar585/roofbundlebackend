const express = require("express");
const router = express.Router();
const User = require("../models/User");

//routes
router.post("/", async (req, res, next) => {
  const { email, passToken } = req.body;

  try {
    const user = await User.findOne({ email });

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email Invalid", 401));
    }
    //checking if the passToken and email exists
    if (user.passToken != passToken) {
      return next(new ErrorResponse("Email/Token Invalid", 401));
    }

    res.status(201).json({
      fname: user.fname,
      lname: user.lname,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
