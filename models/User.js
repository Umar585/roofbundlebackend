const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");

let userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "fname required"],
    },
    lname: {
      type: String,
      required: [true, "lname required"],
    },
    passToken: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "email required",
      ],
    },
    password: {
      type: String,
      required: [true, "password required"],
      select: false,
    },
    terms: {
      type: Boolean,
      required: [true, "terms required"],
    },
    role: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailToken: String,
    isVerified: Boolean,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jsonwebtoken.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_SECRET_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
