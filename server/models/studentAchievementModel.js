const mongoose = require("mongoose");
const studentAchievementSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolUser",
      required: [true, "Please add a student"],
    },
    name: {
      type: String,
      required: [true, "Please add a class name"],
    },
    description: {
      type: String,
    },
    classWhenObtained: {
      type: String,
      required: [true, "Please add a class name"],
    },
    dateOfAchievement: {
      type: Date,
      required: [true, "Please add a date of achievement"],
    },
    category: {
      type: String,
      enum: ["academic", "sports", "cultural", "other"],
      required: [true, "Please add a category"],
    },
  },
  { timestamps: true }
);

const StudentAchievement = mongoose.model("StudentAchievement", studentAchievementSchema);

module.exports = StudentAchievement;
