const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let selectionsSchema = new Schema(
  {
    Replace_ventilation: {
      type: String,
      required: [true, "Replace_ventilation required"],
    },
    brand_roof: {
      type: String,
      required: [true, "brand_roof required"],
    },
    capping_roof: {
      type: String,
      required: [true, "capping_roof required"],
    },
    chimney_flashing: {
      type: String,
      required: [true, "chimney_flashing required"],
    },
    color_roof: {
      type: String,
      required: [true, "color_roof required"],
    },
    convert_BPS: {
      type: String,
      required: [true, "convert_BPS required"],
    },
    drip_edge_flashing: {
      type: String,
      required: [true, "drip_edge_flashing required"],
    },
    fourmat_BPS: {
      type: String,
      required: [true, "fourmat_BPS required"],
    },
    hr_brand: {
      type: String,
      required: [true, "hr_brand required"],
    },
    hr_shingle: {
      type: String,
      required: [true, "hr_shingle required"],
    },
    ice_water_brand: {
      type: String,
      required: [true, "ice_water_brand required"],
    },
    ice_water_protection: {
      type: String,
      required: [true, "ice_water_protection required"],
    },
    new_ventilation: {
      type: String,
      required: [true, "new_ventilation required"],
    },
    onemat_BPS: {
      type: String,
      required: [true, "onemat_BPS required"],
    },
    reSeal_BPS: {
      type: String,
      required: [true, "reSeal_BPS required"],
    },
    remove_ventilation: {
      type: String,
      required: [true, "remove_ventilation required"],
    },
    ridge_ventilation: {
      type: String,
      required: [true, "ridge_ventilation required"],
    },
    shingle_roof: {
      type: String,
      required: [true, "shingle_roof required"],
    },
    starter_brand: {
      type: String,
      required: [true, "starter_brand required"],
    },
    starter_shingle: {
      type: String,
      required: [true, "starter_shingle required"],
    },
    threemat_BPS: {
      type: String,
      required: [true, "threemat_BPS required"],
    },
    twomat_BPS: {
      type: String,
      required: [true, "twomat_BPS required"],
    },
    underlay_brand: {
      type: String,
      required: [true, "underlay_brand required"],
    },
    underlay_protection: {
      type: String,
      required: [true, "underlay_protection required"],
    },
    valley_flashing: {
      type: String,
      required: [true, "valley_flashing required"],
    },
    wall_roof_flashing: {
      type: String,
      required: [true, "wall_roof_flashing required"],
    },
    layer: {
      type: String,
      required: [true, "layer required"],
    },
    delivery: {
      type: String,
      required: [true, "delivery required"],
    },
    bin: {
      type: String,
      required: [true, "bin required"],
    },
    decking: {
      type: String,
      required: [true, "decking required"],
    },
    chimney: {
      type: String,
      required: [true, "chimney required"],
    },
    install: {
      type: String,
      required: [true, "install required"],
    },
    warranty: {
      type: String,
      required: [true, "warranty required"],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
    collection: "selections",
  }
);

module.exports = mongoose.model("Selections", selectionsSchema);
