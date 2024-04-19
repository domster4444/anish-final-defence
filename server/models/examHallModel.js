const mongoose = require("mongoose");
const examHallSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    capacity: {
      type: Number,
    },
    designData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const ExamHall = mongoose.model("ExamHall", examHallSchema);

module.exports = ExamHall;
