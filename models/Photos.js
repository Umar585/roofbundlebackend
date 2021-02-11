const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let photosSchema = new Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  },
  {
    timestamps: true,
    collection: "photos",
  }
);

module.exports = mongoose.model("Photos", photosSchema);
