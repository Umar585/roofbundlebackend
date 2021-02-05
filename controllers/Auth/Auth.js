const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../../Utils/Auth");
require("dotenv").config();
const ErrorResponse = require("../../Utils/ErrorResponse");
const sendEmail = require("../../Utils/sendEmail");
const crypto = require("crypto");

//Sign Up
exports.signup = async (req, res, next) => {
  const {
    fname,
    lname,
    email,
    password,
    password_confirmation,
    terms,
  } = req.body;

  try {
    const user = await User.create({
      fname,
      lname,
      email,
      password,
      password_confirmation,
      terms,
      role: "Admin",
      emailToken: crypto.randomBytes(20).toString("hex"),
      isVerified: false,
    });

    const message = `
        <h1>Hello</h1>
        <p>thanks for registering on our site</p>
        <p>http://localhost:3000/verifyemail/${user.emailToken}</>
        `;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
//Email Verification
exports.verifyemail = async (req, res, next) => {
  const emailToken = req.params.emailToken;

  try {
    const user = await User.findOne({ emailToken: emailToken });
    if (!user) {
      return next(new ErrorResponse("Invalid Email Token", 400));
    }

    user.emailToken = null;
    user.isVerified = true;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Email Verified",
    });
  } catch (error) {
    next(error);
  }
};
//Sign In
exports.signin = async (req, res, next) => {
  //getting email and password from Front-end
  const { email, password } = req.body;

  //throw err if email or password are empty
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and passowrd", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    //checking if the email exists
    if (!user) {
      return next(new ErrorResponse("Email or Password Invalid", 401));
    }
    //checking if the passwords match
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Email or Password Invalid", 401));
    }

    if (user.isVerified === false) {
      return next(new ErrorResponse("Email not verified", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
//Forgot Passoword
exports.forgotpassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    if (user.isVerified === false) {
      return next(new ErrorResponse("Email not verified", 401));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};
//Reset Password
exports.resetpassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
