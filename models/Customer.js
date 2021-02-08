const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "fname required"],
    },
    lname: {
      type: String,
      required: [true, "lname required"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
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
    scope: {
      type: String,
      required: [true, "scope required"],
    },
    address: {
      type: String,
      required: [true, "address required"],
    },
    lats: {
      type: String,
      required: [true, "lats required"],
    },
    lngs: {
      type: String,
      required: [true, "lngs required"],
    },
    process: {
      type: String,
      required: [true, "process required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "customers",
  }
);

module.exports = mongoose.model("Customer", customerSchema);
