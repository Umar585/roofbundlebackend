const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let profitsSchema = new Schema(
  {
    pitchTwo: {
      type: String,
      required: [true, "pitchTwo required"],
    },
    pitchTwoFive: {
      type: String,
      required: [true, "pitchTwoFive required"],
    },
    pitchThree: {
      type: String,
      required: [true, "pitchThree required"],
    },
    pitchFour: {
      type: String,
      required: [true, "pitchFour required"],
    },
    pitchFive: {
      type: String,
      required: [true, "pitchFive required"],
    },
    pitchSix: {
      type: String,
      required: [true, "pitchSix required"],
    },
    pitchSeven: {
      type: String,
      required: [true, "pitchSeven required"],
    },
    pitchEight: {
      type: String,
      required: [true, "pitchEight required"],
    },
    pitchNine: {
      type: String,
      required: [true, "pitchNine required"],
    },
    pitchTen: {
      type: String,
      required: [true, "pitchTen required"],
    },
    pitchEleven: {
      type: String,
      required: [true, "pitchEleven required"],
    },
    pitchTwelve: {
      type: String,
      required: [true, "pitchTwelve required"],
    },
    pitchThirteen: {
      type: String,
      required: [true, "pitchThirteen required"],
    },
    pitchFourteen: {
      type: String,
      required: [true, "pitchFourteen required"],
    },
    pitchFifteen: {
      type: String,
      required: [true, "pitchFifteen required"],
    },
    pitchSixteen: {
      type: String,
      required: [true, "pitchSixteen required"],
    },
    pitchSeventeen: {
      type: String,
      required: [true, "pitchSeventeen required"],
    },
    pitchEighteen: {
      type: String,
      required: [true, "pitchEighteen required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "profits",
  }
);

module.exports = mongoose.model("Profits", profitsSchema);
