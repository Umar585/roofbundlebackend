const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RoofMeasureSchema = new Schema(
  {
    bin: {
      type: Boolean,
    },
    chimney: {
      type: String,
    },
    chimneyInc: {
      type: String,
    },
    eave: {
      type: String,
    },
    eaveInc: {
      type: String,
    },
    gableGrnd: {
      type: String,
    },
    gableGrndInc: {
      type: String,
    },
    hipRM: {
      type: String,
    },
    hipRMInc: {
      type: String,
    },
    measureType: {
      type: String,
    },
    newConst: {
      type: Boolean,
    },
    pitch: {
      type: String,
    },
    ridge: {
      type: String,
    },
    ridgeInc: {
      type: String,
    },
    roofTop: {
      type: Boolean,
    },
    stories: {
      type: String,
    },
    totalSqFt: {
      type: String,
    },
    valleyRM: {
      type: String,
    },
    valleyRMInc: {
      type: String,
    },
    wall: {
      type: String,
    },
    wallInc: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "roofmeasure",
  }
);

module.exports = mongoose.model("RoofMeasure", RoofMeasureSchema);
