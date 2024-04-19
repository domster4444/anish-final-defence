const mongoose = require("mongoose");
const borrowedSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolUser",
      required: [true, "Please select a student"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolBook",
      required: [true, "Please select a book"],
    },

    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },

    noOfReturnedBooks: {
      type: Number,
      default: 0,
    },

    dateTaken: {
      type: Date,
      default: Date.now,
      required: [true, "Please add a date taken"],
    },

    dateToReturn: {
      type: Date,
      required: [true, "Please add a date to return"],
    },

    lastDateWhenBookWasReturned: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["borrowed", "returned", "returned with lost fine", "returned with damage fine"],
      default: "borrowed",
    },

    fineAmountPaid: {
      type: Number,
      default: 0,
    },
    isFinePaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BorrowedBook = mongoose.model("BorrowedBook", borrowedSchema);

module.exports = BorrowedBook;
