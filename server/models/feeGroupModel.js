const mongoose = require("mongoose");
const feeGroupSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a fee group name"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const FeeGroup = mongoose.model("FeeGroup", feeGroupSchema);

module.exports = FeeGroup;
