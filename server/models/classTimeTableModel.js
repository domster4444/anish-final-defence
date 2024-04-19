const mongoose = require("mongoose");

const classTimeTableSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolClass",
    required: true,
  },
  section: {
    type: String,
  },
  day: {
    type: String,
    required: true,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  subjects: [
    {
      subject: {
        type: String,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolUser",
      },
      timeFrom: {
        type: String,
      },
      timeTo: {
        type: String,
      },
    },
  ],
});

const ClassTimeTable = mongoose.model("ClassTimeTable", classTimeTableSchema);

module.exports = ClassTimeTable;

// type: mongoose.Schema.Types.ObjectId,
// ref: "SchoolUser",
// required: true,
