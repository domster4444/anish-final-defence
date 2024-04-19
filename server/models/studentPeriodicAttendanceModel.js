const mongoose = require("mongoose");
const studentOneTimeAttendanceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolUser",
      required: [true, "Please add a batch"],
    },

    studentBatch: {
      type: String,
      required: [true, "Please add a batch"]
    },

    currentRollNo: {
      type: String,
      required: [true, "Please add a roll no"]
    },

    currentClass: {
      type: String,
      required: [true, "Please add a class"],
    },
    currentSection: {
      type: String,
      required: [true, "Please add a section"],
    },

    // // todo: Subject is optional as there is two types of attendance, one is subject wise and other is one time attendance
    // subject: {
    //   type: String,
    //   required: [true, "Please add a subject"],
// }
    currentSubject: {
        type: String,
        required: [true, "Please add a subject"]
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId
    },

    date: {
      type: String,
      required: [true, "Please add a date"],
    },

    attendanceId: {
      type: String,
      unique: true,
      required: [true, "Please add attendanceId"],
    },

    status: {
      type: String,
      enum: ["present", "late", "absent", "leave", "permit"],
      default: "present",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const StudentOneTimeAttendance = mongoose.model("StudentPeriodicAttendance", studentOneTimeAttendanceSchema);

module.exports = StudentOneTimeAttendance;
