const mongoose = require("mongoose");
const bookFineSchema = new mongoose.Schema(
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

    bookName: {
      type: String,
      required: [true, "Please add a book name"],
    },

    noOfLostBooks: {
      type: Number,
      default: 0,
    },

    noOfDamagedBooks: {
      type: Number,
      default: 0,
    },

    fineAmount: {
      type: Number,
      required: [true, "Please add a fine amount"],
    },

    fineType: {
      type: String,
      required: [true, "Please add a fine type"],
      enum: ["lost", "damaged", "late"],
      default: "late",
    },
  },
  { timestamps: true }
);

const BookFine = mongoose.model("BookFine", bookFineSchema);

module.exports = BookFine;
