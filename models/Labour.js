const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let laboursSchema = new Schema(
  {
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
    collection: "labours",
  }
);

module.exports = mongoose.model("Labours", laboursSchema);
