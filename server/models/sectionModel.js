const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const Section = mongoose.model("SchoolSection", sectionSchema);

module.exports = Section;
