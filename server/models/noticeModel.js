//? types import

const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema(
  {
    noticeBy: {
      type: String,
      required: true,
    },
    noticerImage: {
      type: String,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School", // Refers to the 'School' model
      required: [true, "Please add a school"],
    },
    noticeTitle: {
      type: String,
      required: true,
    },
    noticeTo: {
      type: String,
      enum: ["everyone", "admin", "teacher", "student", "parent", "librarian", "accountant", "registrar", "class representative", "examination officer"],
      required: true,
    },

    noticeDescription: {
      type: String,
      required: true,
    },
    noticeCategory: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
