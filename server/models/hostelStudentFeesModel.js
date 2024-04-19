const mongoose = require("mongoose");
const hostelStudentFeesSchema = new mongoose.Schema(
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
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: [true, "Please add a school"],
    },
    year: {
      type: String,
      required: [true, "Please add a year"],
    },
    month: {
      type: String,
      required: [true, "Please add a month"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a amount"],
    },

    method: {
      type: String,
      required: [true, "Please add a method"],
    },
  },
  { timestamps: true }
);

const HostelStudentFees = mongoose.model("HostelStudentFees", hostelStudentFeesSchema);

module.exports = HostelStudentFees;
