const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let materialsSchema = new Schema(
  {
    bundle: {
      type: String,
      required: [true, "Bundle required"],
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
    groundDropCost: {
      type: String,
      required: [true, "Ground Drop Cost required"],
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "materials",
  }
);

module.exports = mongoose.model("Materials", materialsSchema);
