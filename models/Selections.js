const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let selectionsSchema = new Schema(
  {
    Replace_ventilation: {
      type: String,
      required: [true, "Replace_ventilation required"],
    },
    away_bin: {
      type: Boolean,
    },
    brand_roof: {
      type: String,
      required: [true, "brand_roof required"],
    },
    brick_chimney: {
      type: Boolean,
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
    concrete_chimney: {
      type: Boolean,
    },
    convert_BPS: {
      type: String,
      required: [true, "convert_BPS required"],
    },
    drip_edge_flashing: {
      type: String,
      required: [true, "drip_edge_flashing required"],
    },
    fir_decking: {
      type: Boolean,
    },
    fourmat_BPS: {
      type: String,
      required: [true, "fourmat_BPS required"],
    },
    ground_delivery: {
      type: Boolean,
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
    metal_chimney: {
      type: Boolean,
    },
    new_ventilation: {
      type: String,
      required: [true, "new_ventilation required"],
    },
    oneLayer_remove: {
      type: Boolean,
    },
    onemat_BPS: {
      type: String,
      required: [true, "onemat_BPS required"],
    },
    osb_decking: {
      type: Boolean,
    },
    plywood_decking: {
      type: Boolean,
    },
    reSeal_BPS: {
      type: String,
      required: [true, "reSeal_BPS required"],
    },
    registered_warranty: {
      type: Boolean,
    },
    remove_ventilation: {
      type: String,
      required: [true, "remove_ventilation required"],
    },
    ridge_ventilation: {
      type: String,
      required: [true, "ridge_ventilation required"],
    },
    roof_bin: {
      type: Boolean,
    },
    rooftop_delivery: {
      type: Boolean,
    },
    satellite_reinstall: {
      type: Boolean,
    },
    shingle_roof: {
      type: String,
      required: [true, "shingle_roof required"],
    },
    solar_reinstall: {
      type: Boolean,
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
    twoLayer_remove: {
      type: Boolean,
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
    work_warranty: {
      type: Boolean,
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
