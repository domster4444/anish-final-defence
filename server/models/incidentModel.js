const mongoose = require("mongoose");
const incidentSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a class name"],
    },
    points: {
      type: Number,
      required: [true, "Please add a points"],
    },
    isNegative: {
      type: String,
      required: [true, "Please add a isNegative"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
