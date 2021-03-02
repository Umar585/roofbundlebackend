const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let albumSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "album",
  }
);

module.exports = mongoose.model("Album", albumSchema);
