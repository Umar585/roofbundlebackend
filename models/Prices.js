const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pricingSchema = new Schema(
  {
    bundle: {
      type: String,
      required: [true, "Chingle required"],
    },
    starterBundle: {
      type: String,
      required: [true, "Starter Shingle required"],
    },
    cappingBundle: {
      type: String,
      required: [true, "Capping Bundle required"],
    },
    roofTopCost: {
      type: String,
      required: [true, "Roof_Top Delivery required"],
    },
    iceWater: {
      type: String,
      required: [true, "Ice and Water Shingle required"],
    },
    underLayment: {
      type: String,
      required: [true, "Underlayment required"],
    },
    dripEdge: {
      type: String,
      required: [true, "Drip Edge required"],
    },
    ridgeVent: {
      type: String,
      required: [true, "Ridge Vent required"],
    },
    roofVent: {
      type: String,
      required: [true, "Roof Vent required"],
    },
    plumbingStackMat: {
      type: String,
      required: [true, "Plumbing Stack Mat required"],
    },
    binCost: {
      type: String,
      required: [true, "Garbage Bin required"],
    },
    iceWaterLabour: {
      type: String,
      required: [true, "Ice Water Labour required"],
    },
    dripEdgeLabour: {
      type: String,
      required: [true, "Drip Edge Labour required"],
    },
    ventLabour: {
      type: String,
      required: [true, "Vent Labour: required"],
    },
    ridgeVentLabour: {
      type: String,
      required: [true, "Ridge Vent Labour: required"],
    },
    plumbingStackMatLabour: {
      type: String,
      required: [true, "Plumbing Stack Mat Labour: required"],
    },
    underLaymentLabour: {
      type: String,
      required: [true, "Underlayment Labour: required"],
    },
    chimneyFlashingLabour: {
      type: String,
      required: [true, "Chimney Flashing Labour required"],
    },
    wallFlashingLabour: {
      type: String,
      required: [true, "Wall Flashing Labour required"],
    },
    satelliteLabour: {
      type: String,
      required: [true, "Satellite Labour required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "pricing",
  }
);

module.exports = mongoose.model("Pricing", pricingSchema);
