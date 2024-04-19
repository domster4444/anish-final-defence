const mongoose = require("mongoose");
const purposeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a purpose for front deck setup"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Purpose = mongoose.model("Purpose", purposeSchema);

module.exports = Purpose;
