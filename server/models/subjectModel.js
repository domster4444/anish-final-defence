const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    assignedClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolClass",
      required: [true, "Please add a class"],
    },
    // i will send ['biology','social'] for name
    name: {
      type: Array,
      required: [true, "Please add a subjects name"],
    },

    assignedSection: {
      type: Array,
      required: [true, "Please add a sections name"],
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("SchoolSubject", subjectSchema);

module.exports = Subject;
