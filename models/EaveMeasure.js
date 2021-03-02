const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let EaveMeasureSchema = new Schema(
  {
    adjOneStory: {
      type: String,
    },
    adjOneStoryInc: {
      type: String,
    },
    adjOneStoryPrice: {
      type: String,
    },
    adjTwoStory: {
      type: String,
    },
    adjTwoStoryInc: {
      type: String,
    },
    adjTwoStoryPrice: {
      type: String,
    },
    corners: {
      type: String,
    },
    cornersPrice: {
      type: String,
    },
    difficultyPrice: {
      type: String,
    },
    elbows: {
      type: String,
    },
    extraExtensions: {
      type: String,
    },
    extraExtensionsPrice: {
      type: String,
    },
    oneStoryDown: {
      type: String,
    },
    oneStoryDownPrice: {
      type: String,
    },
    oneStoryEaves: {
      type: String,
    },
    oneStoryPrice: {
      type: String,
    },
    twoStoryDown: {
      type: String,
    },
    twoStoryDownPrice: {
      type: String,
    },
    twoStoryPrice: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "eavemeasure",
  }
);

module.exports = mongoose.model("EaveMeasure", EaveMeasureSchema);
