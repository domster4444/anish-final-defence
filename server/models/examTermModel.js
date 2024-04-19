const mongoose = require("mongoose");
const examTermSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a class name"],
    }
  },
  { timestamps: true }
);

const ExamTerm = mongoose.model("ExamTerm", examTermSchema);

module.exports = ExamTerm;