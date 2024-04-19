const mongoose = require("mongoose");
const idCardDesignSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    redCardFrontDesign: {
      type: String,
    },
    redCardBackDesign: {
      type: String,
    },
    greenCardFrontDesign: {
      type: String,
    },
    greenCardBackDesign: {
      type: String,
    },
    blueCardFrontDesign: {
      type: String,
    },
    blueCardBackDesign: {
      type: String,
    },
    yellowCardFrontDesign: {
      type: String,
    },
    yellowCardBackDesign: {
      type: String,
    },
  },
  { timestamps: true }
);

const IdCardDesign = mongoose.model("IdCardDesign", idCardDesignSchema);

module.exports = IdCardDesign;
