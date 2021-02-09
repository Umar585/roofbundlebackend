const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let photosSchema = new Schema(
  {
    photo: {
      type: Buffer,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  },
  {
    timestamps: true,
    collection: "album",
  }
);

module.exports = mongoose.model("Photos", photosSchema);
