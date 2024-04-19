const mongoose = require("mongoose");
const referenceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a reference type for font desk"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
