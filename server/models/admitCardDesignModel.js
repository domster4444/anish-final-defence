const mongoose = require("mongoose");
const admitCardDesignSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    design: {
      type: String,
    },
  },
  { timestamps: true }
);

const AdmitCardDesign = mongoose.model("AdmitCardDesign", admitCardDesignSchema);

module.exports = AdmitCardDesign;
