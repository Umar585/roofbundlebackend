const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let diagramsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
    },
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "diagrams",
  }
);

module.exports = mongoose.model("Diagrams", diagramsSchema);
