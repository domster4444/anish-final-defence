//When creating this decrease the room capacity by 1 and when deleting increase the room capacity by 1
// when changing the room then also  increase the room capacity by 1
const mongoose = require("mongoose");
const hostelStudentSchema = new mongoose.Schema(
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
      required: [true, "Please add a hostel"],
    },

    hostelRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HostelRoom",
      required: [true, "Please add a hostel room"],
    },

    bedOccupied: {
      type: Number,
      required: [true, "Please add a bed occupied"],
    },

    roomRegistrationDate: {
      type: Date,
      required: [true, "Please add a room registration date"],
    },

    roomVacatingDate: {
      type: Date,
      required: [true, "Please add a room vacating date"],
    },
  },
  { timestamps: true }
);

const HostelStudent = mongoose.model("HostelStudent", hostelStudentSchema);

module.exports = HostelStudent;

// hostelStudentFeesModal
// paidFeesHistory: [
//   {
//     year: {
//       type: String,
//     },
//     month: {
//       type: String,
//     },
//     amount: {
//       type: String,
//     },
//     date: {
//       type: Date,
//     },
//   },
// ],
