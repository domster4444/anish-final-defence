const mongoose = require("mongoose");
const sourceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a source"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Source = mongoose.model("Source", sourceSchema);

module.exports = Source;
