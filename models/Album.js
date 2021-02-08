const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let albumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
    },
    main_photo: {
      data: Buffer,
      contentType: String,
    },
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
