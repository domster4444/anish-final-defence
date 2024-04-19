const mongoose = require("mongoose");
const feeTypeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a fee type name"],
    },
    feeCode: {
      type: String,
      required: [true, "Please add a fee code name"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const FeeType = mongoose.model("FeeType", feeTypeSchema);

module.exports = FeeType;
