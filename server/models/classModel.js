const mongoose = require("mongoose");
const classSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School", // Refers to the 'School' model
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a class name"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("SchoolClass", classSchema);

module.exports = Class;
